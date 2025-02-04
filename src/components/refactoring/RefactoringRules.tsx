import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addRefactoringRule, validateRule } from "@/utils/refactoring";

export const RefactoringRules = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [pattern, setPattern] = useState("");
  const [replacement, setReplacement] = useState("");
  const [filePattern, setFilePattern] = useState("");
  const [description, setDescription] = useState("");

  const { data: rules = [], refetch } = useQuery({
    queryKey: ['refactoring-rules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('refactoring_rules')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!validateRule(pattern, replacement)) {
        toast({
          title: "Invalid Rule",
          description: "The pattern is not a valid regular expression",
          variant: "destructive",
        });
        return;
      }

      await addRefactoringRule(name, pattern, replacement, filePattern, description);
      
      toast({
        title: "Success",
        description: "Refactoring rule added successfully",
      });
      
      setName("");
      setPattern("");
      setReplacement("");
      setFilePattern("");
      setDescription("");
      
      refetch();
    } catch (error) {
      console.error('Error adding rule:', error);
      toast({
        title: "Error",
        description: "Failed to add refactoring rule",
        variant: "destructive",
      });
    }
  };

  const toggleRuleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('refactoring_rules')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      refetch();
      
      toast({
        title: "Success",
        description: `Rule ${currentStatus ? 'disabled' : 'enabled'} successfully`,
      });
    } catch (error) {
      console.error('Error toggling rule status:', error);
      toast({
        title: "Error",
        description: "Failed to update rule status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rule Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter rule name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Pattern (RegEx)</label>
          <Input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter pattern (regular expression)"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Replacement</label>
          <Input
            value={replacement}
            onChange={(e) => setReplacement(e.target.value)}
            placeholder="Enter replacement text"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">File Pattern (optional)</label>
          <Input
            value={filePattern}
            onChange={(e) => setFilePattern(e.target.value)}
            placeholder="e.g., \.tsx$"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter rule description"
            className="min-h-[100px]"
          />
        </div>
        
        <Button type="submit">Add Rule</Button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing Rules</h2>
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-4 border rounded-lg space-y-2"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{rule.name}</h3>
              <Button
                variant={rule.is_active ? "default" : "secondary"}
                onClick={() => toggleRuleStatus(rule.id, rule.is_active)}
              >
                {rule.is_active ? 'Disable' : 'Enable'}
              </Button>
            </div>
            <p className="text-sm text-gray-600">{rule.description}</p>
            <div className="text-sm">
              <p><strong>Pattern:</strong> {rule.pattern}</p>
              <p><strong>Replacement:</strong> {rule.replacement}</p>
              {rule.file_pattern && (
                <p><strong>File Pattern:</strong> {rule.file_pattern}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
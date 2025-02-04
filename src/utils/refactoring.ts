import { supabase } from "@/integrations/supabase/client";

interface RefactoringRule {
  id: string;
  name: string;
  pattern: string;
  replacement: string;
  file_pattern?: string;
  is_active: boolean;
}

export const applyRefactoringRules = async (content: string, filePath: string): Promise<string> => {
  console.log('Applying refactoring rules to:', filePath);
  
  try {
    const { data: rules, error } = await supabase
      .from('refactoring_rules')
      .select('*')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching refactoring rules:', error);
      throw error;
    }

    let modifiedContent = content;
    
    rules?.forEach((rule: RefactoringRule) => {
      if (rule.file_pattern && !filePath.match(new RegExp(rule.file_pattern))) {
        return;
      }

      try {
        const pattern = new RegExp(rule.pattern, 'g');
        modifiedContent = modifiedContent.replace(pattern, rule.replacement);
        console.log(`Applied rule: ${rule.name}`);
      } catch (e) {
        console.error(`Error applying rule ${rule.name}:`, e);
      }
    });

    return modifiedContent;
  } catch (error) {
    console.error('Error in applyRefactoringRules:', error);
    return content; // Return original content if there's an error
  }
};

export const validateRule = (pattern: string, replacement: string): boolean => {
  try {
    new RegExp(pattern);
    return true;
  } catch (e) {
    return false;
  }
};

export const addRefactoringRule = async (
  name: string,
  pattern: string,
  replacement: string,
  filePattern?: string,
  description?: string
) => {
  if (!validateRule(pattern, replacement)) {
    throw new Error('Invalid regular expression pattern');
  }

  const { data, error } = await supabase
    .from('refactoring_rules')
    .insert([
      {
        name,
        pattern,
        replacement,
        file_pattern: filePattern,
        description,
      },
    ])
    .select();

  if (error) throw error;
  return data;
};
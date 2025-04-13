import Layout from "@/components/Layout";
import MaintenanceCheckForm from "@/components/maintenance/form/MaintenanceCheckForm";
import MaintenanceHistory from "@/components/maintenance/MaintenanceHistory";
import DocumentManager from "@/components/maintenance/documents/DocumentManager";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import FormSection from "@/components/maintenance/form/FormSection";

const MaintenanceChecks = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("history");
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value !== "form") {
      setShowForm(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className={`flex flex-col ${isMobile ? 'gap-3' : 'md:flex-row'} justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-6 rounded-lg shadow-sm`}>
          <div>
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600`}>
              HVAC Maintenance Checks
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Daily preventative maintenance checks for chillers and air handlers
            </p>
          </div>
          
          {showForm && isMobile ? (
            <Button 
              onClick={() => setShowForm(false)}
              variant="outline"
              className="w-full md:w-auto flex items-center justify-center"
              size="lg"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to List
            </Button>
          ) : (
            <Button 
              onClick={() => {
                setShowForm(true);
                setActiveTab("form");
              }}
              className={`${isMobile ? 'w-full' : ''} bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" /> New Check
            </Button>
          )}
        </div>

        {!showForm && (
          <Tabs 
            defaultValue="history" 
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="w-full">
              <TabsTrigger value="history" className="flex-1">Maintenance History</TabsTrigger>
              <TabsTrigger value="documents" className="flex-1">Documents Repository</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="mt-4">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <MaintenanceHistory />
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <FormSection noPadding>
                  <DocumentManager isRepositoryView={true} />
                </FormSection>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 animate-fade-in">
            <MaintenanceCheckForm onComplete={() => setShowForm(false)} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MaintenanceChecks;

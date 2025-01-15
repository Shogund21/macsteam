import Layout from "@/components/Layout";
import { PrintView as PrintViewComponent } from "@/components/print/PrintView";

const PrintView = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 print:mb-2">Print View</h1>
        <PrintViewComponent />
      </div>
    </Layout>
  );
};

export default PrintView;
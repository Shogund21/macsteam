import Layout from "@/components/Layout";
import EquipmentForm from "@/components/equipment/EquipmentForm";

const AddEquipment = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Add New Equipment</h1>
          <p className="text-muted-foreground mt-2">
            Enter the details of the new equipment
          </p>
        </div>
        <EquipmentForm />
      </div>
    </Layout>
  );
};

export default AddEquipment;
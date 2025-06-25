
import AccessibleForm from "../components/AccessibleForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
          <AccessibleForm />
        </div>
      </div>
    </div>
  );
};

export default Index;

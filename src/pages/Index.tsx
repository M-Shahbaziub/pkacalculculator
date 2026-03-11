import PkaFromPh from "@/components/PkaFromPh";
import PkaFromKa from "@/components/PkaFromKa";
import PkaTable from "@/components/PkaTable";
import { Atom } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
              <Atom className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-card-foreground tracking-tight">
                pK<sub>a</sub> Calculator
              </h1>
              <p className="text-sm text-muted-foreground">
                Calculate pK<sub>a</sub> from pH or K<sub>a</sub> — with real-time results
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Side-by-side calculators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PkaFromPh />
          <PkaFromKa />
        </div>

        {/* Reference Table */}
        <PkaTable />
      </main>
    </div>
  );
};

export default Index;

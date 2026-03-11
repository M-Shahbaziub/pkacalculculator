const acids = [
  { name: "Hydrochloric acid", formula: "HCl", pka: -6.3, strength: "Strong" },
  { name: "Sulfuric acid", formula: "H₂SO₄", pka: -3.0, strength: "Strong" },
  { name: "Nitric acid", formula: "HNO₃", pka: -1.4, strength: "Strong" },
  { name: "Phosphoric acid", formula: "H₃PO₄", pka: 2.15, strength: "Moderate" },
  { name: "Hydrofluoric acid", formula: "HF", pka: 3.17, strength: "Moderate" },
  { name: "Acetic acid", formula: "CH₃COOH", pka: 4.76, strength: "Weak" },
  { name: "Carbonic acid", formula: "H₂CO₃", pka: 6.35, strength: "Weak" },
  { name: "Hydrogen sulfide", formula: "H₂S", pka: 7.0, strength: "Weak" },
  { name: "Boric acid", formula: "H₃BO₃", pka: 9.24, strength: "Weak" },
  { name: "Phenol", formula: "C₆H₅OH", pka: 9.95, strength: "Weak" },
  { name: "Water", formula: "H₂O", pka: 15.7, strength: "Very weak" },
];

const strengthColor: Record<string, string> = {
  Strong: "bg-destructive/10 text-destructive",
  Moderate: "bg-primary/10 text-primary",
  Weak: "bg-accent/10 text-accent",
  "Very weak": "bg-muted text-muted-foreground",
};

const PkaTable = () => (
  <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-card-foreground mb-4">
      Common pK<sub>a</sub> Values
    </h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 px-3 font-medium text-muted-foreground">Acid</th>
            <th className="text-left py-2 px-3 font-medium text-muted-foreground">Formula</th>
            <th className="text-right py-2 px-3 font-medium text-muted-foreground">pK<sub>a</sub></th>
            <th className="text-center py-2 px-3 font-medium text-muted-foreground">Strength</th>
          </tr>
        </thead>
        <tbody>
          {acids.map((acid) => (
            <tr key={acid.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-2.5 px-3 text-card-foreground">{acid.name}</td>
              <td className="py-2.5 px-3 font-mono text-muted-foreground text-xs">{acid.formula}</td>
              <td className="py-2.5 px-3 text-right font-mono font-medium text-card-foreground">{acid.pka.toFixed(2)}</td>
              <td className="py-2.5 px-3 text-center">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${strengthColor[acid.strength]}`}>
                  {acid.strength}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PkaTable;

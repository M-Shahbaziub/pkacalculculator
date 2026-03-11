import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PkaScale from "@/components/PkaScale";
import { Beaker } from "lucide-react";

const PkaFromPh = () => {
  const [ph, setPh] = useState("");
  const [conjugateBase, setConjugateBase] = useState("");
  const [weakAcid, setWeakAcid] = useState("");

  const calculate = useCallback(() => {
    const phVal = parseFloat(ph);
    const cbVal = parseFloat(conjugateBase);
    const waVal = parseFloat(weakAcid);

    if (!isNaN(phVal) && !isNaN(cbVal) && !isNaN(waVal) && waVal > 0 && cbVal > 0) {
      // Henderson-Hasselbalch: pH = pKa + log([A-]/[HA])
      const pka = phVal - Math.log10(cbVal / waVal);
      const ka = Math.pow(10, -pka);
      return { pka, ka };
    }
    return null;
  }, [ph, conjugateBase, weakAcid]);

  const result = calculate();

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Beaker className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            pK<sub>a</sub> from pH
          </h2>
          <p className="text-sm text-muted-foreground">Henderson-Hasselbalch equation</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="ph" className="text-sm font-medium text-card-foreground">pH</Label>
          <Input
            id="ph"
            type="number"
            step="any"
            placeholder="e.g., 4.75"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            className="font-mono"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="conjugateBase" className="text-sm font-medium text-card-foreground">
            Conjugate base concentration [A⁻] (M)
          </Label>
          <Input
            id="conjugateBase"
            type="number"
            step="any"
            placeholder="e.g., 0.1"
            value={conjugateBase}
            onChange={(e) => setConjugateBase(e.target.value)}
            className="font-mono"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="weakAcid" className="text-sm font-medium text-card-foreground">
            Weak acid concentration [HA] (M)
          </Label>
          <Input
            id="weakAcid"
            type="number"
            step="any"
            placeholder="e.g., 0.15"
            value={weakAcid}
            onChange={(e) => setWeakAcid(e.target.value)}
            className="font-mono"
          />
        </div>

        <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground font-mono">
          pH = pK<sub>a</sub> + log([A⁻] / [HA])
        </div>
      </div>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="rounded-lg bg-result/10 border border-result/20 p-4">
            <p className="text-sm text-muted-foreground mb-1">pK<sub>a</sub></p>
            <p className="text-2xl font-bold font-mono text-result">{result.pka.toFixed(4)}</p>
          </div>
          <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
            <p className="text-sm text-muted-foreground mb-1">K<sub>a</sub></p>
            <p className="text-lg font-semibold font-mono text-primary">{result.ka.toExponential(4)}</p>
          </div>
          <PkaScale value={result.pka} />
        </div>
      )}
    </div>
  );
};

export default PkaFromPh;

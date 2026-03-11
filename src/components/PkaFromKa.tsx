import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PkaScale from "@/components/PkaScale";
import { FlaskConical } from "lucide-react";

const PkaFromKa = () => {
  const [ka, setKa] = useState("");
  const [kaExponent, setKaExponent] = useState("");
  const [pka, setPka] = useState("");
  const [mode, setMode] = useState<"ka-to-pka" | "pka-to-ka">("ka-to-pka");

  const resultFromKa = useCallback(() => {
    const kaVal = parseFloat(ka);
    const expVal = kaExponent ? parseFloat(kaExponent) : 0;
    if (!isNaN(kaVal) && kaVal > 0) {
      const fullKa = kaVal * Math.pow(10, expVal);
      const calculatedPka = -Math.log10(fullKa);
      return { pka: calculatedPka, ka: fullKa };
    }
    return null;
  }, [ka, kaExponent]);

  const resultFromPka = useCallback(() => {
    const pkaVal = parseFloat(pka);
    if (!isNaN(pkaVal)) {
      const calculatedKa = Math.pow(10, -pkaVal);
      return { pka: pkaVal, ka: calculatedKa };
    }
    return null;
  }, [pka]);

  const result = mode === "ka-to-pka" ? resultFromKa() : resultFromPka();

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
          <FlaskConical className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            pK<sub>a</sub> from K<sub>a</sub>
          </h2>
          <p className="text-sm text-muted-foreground">Acid dissociation constant</p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex rounded-lg bg-muted p-1 mb-5">
        <button
          onClick={() => setMode("ka-to-pka")}
          className={`flex-1 text-sm py-2 px-3 rounded-md font-medium transition-all ${
            mode === "ka-to-pka"
              ? "bg-card text-card-foreground shadow-sm"
              : "text-muted-foreground hover:text-card-foreground"
          }`}
        >
          K<sub>a</sub> → pK<sub>a</sub>
        </button>
        <button
          onClick={() => setMode("pka-to-ka")}
          className={`flex-1 text-sm py-2 px-3 rounded-md font-medium transition-all ${
            mode === "pka-to-ka"
              ? "bg-card text-card-foreground shadow-sm"
              : "text-muted-foreground hover:text-card-foreground"
          }`}
        >
          pK<sub>a</sub> → K<sub>a</sub>
        </button>
      </div>

      <div className="space-y-4">
        {mode === "ka-to-pka" ? (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="ka" className="text-sm font-medium text-card-foreground">
                K<sub>a</sub> (coefficient)
              </Label>
              <Input
                id="ka"
                type="number"
                step="any"
                placeholder="e.g., 1.8"
                value={ka}
                onChange={(e) => setKa(e.target.value)}
                className="font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="kaExp" className="text-sm font-medium text-card-foreground">
                × 10^ (exponent)
              </Label>
              <Input
                id="kaExp"
                type="number"
                step="1"
                placeholder="e.g., -5"
                value={kaExponent}
                onChange={(e) => setKaExponent(e.target.value)}
                className="font-mono"
              />
            </div>
          </>
        ) : (
          <div className="space-y-1.5">
            <Label htmlFor="pkaInput" className="text-sm font-medium text-card-foreground">
              pK<sub>a</sub>
            </Label>
            <Input
              id="pkaInput"
              type="number"
              step="any"
              placeholder="e.g., 4.74"
              value={pka}
              onChange={(e) => setPka(e.target.value)}
              className="font-mono"
            />
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground font-mono">
          pK<sub>a</sub> = −log₁₀(K<sub>a</sub>)
        </div>
      </div>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="rounded-lg bg-result/10 border border-result/20 p-4">
            <p className="text-sm text-muted-foreground mb-1">
              {mode === "ka-to-pka" ? <>pK<sub>a</sub></> : <>K<sub>a</sub></>}
            </p>
            <p className="text-2xl font-bold font-mono text-result">
              {mode === "ka-to-pka" ? result.pka.toFixed(4) : result.ka.toExponential(4)}
            </p>
          </div>
          <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
            <p className="text-sm text-muted-foreground mb-1">
              {mode === "ka-to-pka" ? <>K<sub>a</sub></> : <>pK<sub>a</sub></>}
            </p>
            <p className="text-lg font-semibold font-mono text-primary">
              {mode === "ka-to-pka" ? result.ka.toExponential(4) : result.pka.toFixed(4)}
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            {result.pka < 0 ? "⚡ Very strong acid" : result.pka < 4 ? "🔴 Strong acid" : result.pka < 7 ? "🟡 Moderate acid" : "🟢 Weak acid"}
          </div>
        </div>
      )}
    </div>
  );
};

export default PkaFromKa;

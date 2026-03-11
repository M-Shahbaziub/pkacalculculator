import { useMemo } from "react";

interface PkaScaleProps {
  value: number | null;
  label?: string;
}

const PkaScale = ({ value, label }: PkaScaleProps) => {
  const clampedPosition = useMemo(() => {
    if (value === null) return null;
    // Scale from -10 to 20
    const min = -10;
    const max = 20;
    return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  }, [value]);

  const strengthLabel = useMemo(() => {
    if (value === null) return "";
    if (value < 0) return "Very Strong Acid";
    if (value < 4) return "Strong Acid";
    if (value < 7) return "Moderate Acid";
    if (value < 10) return "Weak Acid";
    if (value < 14) return "Very Weak Acid";
    return "Essentially Neutral";
  }, [value]);

  const ticks = [-10, -5, 0, 5, 7, 10, 15, 20];

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label || "Acid–Base Spectrum"}
        </p>
        {value !== null && (
          <span className="text-xs font-semibold text-result">{strengthLabel}</span>
        )}
      </div>

      {/* Scale bar */}
      <div className="relative mt-3 mb-5">
        {/* Gradient bar */}
        <div
          className="h-3 rounded-full w-full"
          style={{
            background:
              "linear-gradient(to right, hsl(0 84% 60%), hsl(30 90% 55%), hsl(45 95% 55%), hsl(168 76% 42%), hsl(199 89% 48%), hsl(240 50% 60%))",
          }}
        />

        {/* Labels */}
        <div className="flex justify-between mt-0.5">
          <span className="text-[10px] text-destructive font-medium">Strong Acid</span>
          <span className="text-[10px] text-muted-foreground font-medium">Neutral</span>
          <span className="text-[10px] text-primary font-medium">Weak Acid / Base</span>
        </div>

        {/* Tick marks */}
        <div className="absolute top-0 left-0 w-full h-3 pointer-events-none">
          {ticks.map((tick) => {
            const pos = ((tick - -10) / (20 - -10)) * 100;
            return (
              <div
                key={tick}
                className="absolute flex flex-col items-center"
                style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
              >
                <div className="w-px h-3 bg-foreground/20" />
                <span className="text-[9px] text-muted-foreground mt-3.5 font-mono">{tick}</span>
              </div>
            );
          })}
        </div>

        {/* Marker */}
        {value !== null && clampedPosition !== null && (
          <div
            className="absolute transition-all duration-500 ease-out"
            style={{
              left: `${clampedPosition}%`,
              top: "-6px",
              transform: "translateX(-50%)",
            }}
          >
            <div className="flex flex-col items-center">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-foreground" />
              <div className="w-[3px] h-3 bg-foreground rounded-b-full -mt-px" />
              <span className="mt-1 text-[10px] font-mono font-bold text-foreground bg-card px-1.5 py-0.5 rounded border border-border shadow-sm whitespace-nowrap">
                {value.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PkaScale;

import { useState, useEffect, useCallback } from "react";
import { FiX, FiArrowRight, FiArrowLeft, FiCheckCircle, FiZap } from "react-icons/fi";

const TOOLTIP_W = 316;
const PAD = 10;

export default function OnboardingTour({ steps, onComplete, storageKey }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [rect, setRect] = useState(null);
  const [visible, setVisible] = useState(false);

  const step = steps[stepIdx];
  const total = steps.length;
  const isLast = stepIdx === total - 1;

  const complete = useCallback(() => {
    if (storageKey) localStorage.setItem(storageKey, "done");
    onComplete();
  }, [storageKey, onComplete]);

  const advance = useCallback(() => {
    if (isLast) { complete(); return; }
    setStepIdx((s) => s + 1);
  }, [isLast, complete]);

  const back = useCallback(() => {
    if (stepIdx > 0) setStepIdx((s) => s - 1);
  }, [stepIdx]);

  // Locate target and compute rect
  useEffect(() => {
    setVisible(false);

    if (!step.target) {
      step.action?.();
      setRect(null);
      const t = setTimeout(() => setVisible(true), 80);
      return () => clearTimeout(t);
    }

    step.action?.();

    let cancelled = false;
    const tryFind = (attempt = 0) => {
      if (cancelled) return;
      const el = document.getElementById(step.target);
      if (!el) {
        if (attempt < 8) setTimeout(() => tryFind(attempt + 1), 120);
        return;
      }
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setTimeout(() => {
        if (cancelled) return;
        const r = el.getBoundingClientRect();
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
        setVisible(true);
      }, 340);
    };
    const t = setTimeout(tryFind, 80);
    return () => { cancelled = true; clearTimeout(t); };
  }, [stepIdx]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || (e.key === "Enter" && e.target.tagName !== "BUTTON")) advance();
      if (e.key === "ArrowLeft") back();
      if (e.key === "Escape") complete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, back, complete]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Tooltip position
  const tooltipStyle = () => {
    const base = {
      position: "fixed",
      width: TOOLTIP_W,
      maxWidth: "calc(100vw - 2rem)",
      zIndex: 9010,
    };
    if (!rect) {
      return { ...base, top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    }
    const pos = step.position || "right";
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const gap = PAD + 18;

    if (pos === "right") {
      return {
        ...base,
        left: Math.min(rect.left + rect.width + gap, vw - TOOLTIP_W - 16),
        top: Math.max(16, Math.min(vh - 360, rect.top + rect.height / 2 - 140)),
      };
    }
    if (pos === "left") {
      return {
        ...base,
        right: Math.max(16, vw - rect.left + gap),
        top: Math.max(16, Math.min(vh - 360, rect.top + rect.height / 2 - 140)),
      };
    }
    if (pos === "bottom") {
      return {
        ...base,
        top: Math.min(rect.top + rect.height + gap, vh - 360),
        left: Math.max(16, Math.min(vw - TOOLTIP_W - 16, rect.left + rect.width / 2 - TOOLTIP_W / 2)),
      };
    }
    // top
    return {
      ...base,
      bottom: Math.max(16, vh - rect.top + gap),
      left: Math.max(16, Math.min(vw - TOOLTIP_W - 16, rect.left + rect.width / 2 - TOOLTIP_W / 2)),
    };
  };

  if (!visible) return null;

  const progress = ((stepIdx + 1) / total) * 100;

  return (
    <>
      <style>{`
        @keyframes ob-in {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes ob-glow {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Overlay */}
      <div style={{ position: "fixed", inset: 0, zIndex: 9000, pointerEvents: "none" }}>
        {rect ? (
          <>
            <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: Math.max(0, rect.top - PAD), background: "rgba(5,2,18,0.78)", pointerEvents: "all" }} />
            <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, top: rect.top + rect.height + PAD, background: "rgba(5,2,18,0.78)", pointerEvents: "all" }} />
            <div style={{ position: "fixed", top: rect.top - PAD, left: 0, width: Math.max(0, rect.left - PAD), height: rect.height + PAD * 2, background: "rgba(5,2,18,0.78)", pointerEvents: "all" }} />
            <div style={{ position: "fixed", top: rect.top - PAD, left: rect.left + rect.width + PAD, right: 0, height: rect.height + PAD * 2, background: "rgba(5,2,18,0.78)", pointerEvents: "all" }} />
            {/* Glow ring */}
            <div style={{
              position: "fixed",
              top: rect.top - PAD - 2,
              left: rect.left - PAD - 2,
              width: rect.width + (PAD + 2) * 2,
              height: rect.height + (PAD + 2) * 2,
              borderRadius: "16px",
              border: "2px solid rgba(167,139,250,0.9)",
              boxShadow: "0 0 0 4px rgba(124,58,237,0.14), 0 0 48px rgba(124,58,237,0.32)",
              pointerEvents: "none",
              animation: "ob-glow 0.3s ease",
            }} />
          </>
        ) : (
          <div style={{ position: "fixed", inset: 0, background: "rgba(5,2,18,0.85)", pointerEvents: "all" }} />
        )}
      </div>

      {/* Tooltip card */}
      <div
        style={{
          ...tooltipStyle(),
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 28px 90px rgba(0,0,0,0.22), 0 4px 24px rgba(124,58,237,0.14)",
          overflow: "hidden",
          animation: "ob-in 0.28s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Progress bar */}
        <div style={{ height: "3px", background: "#f0eefe" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
            borderRadius: "99px",
            transition: "width 0.4s ease",
          }} />
        </div>

        <div style={{ padding: "1.35rem 1.5rem 1.5rem" }}>
          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{
              fontSize: "10.5px", fontWeight: "700", color: "#a78bfa",
              textTransform: "uppercase", letterSpacing: "0.09em",
              fontFamily: "'Inter', sans-serif",
            }}>
              Étape {stepIdx + 1} sur {total}
            </span>
            <button
              onClick={complete}
              title="Passer le tutoriel"
              style={{
                background: "#f8fafc", border: "none", cursor: "pointer",
                color: "#94a3b8", padding: "4px 6px", borderRadius: "7px",
                display: "flex", lineHeight: 1, transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#94a3b8"; }}
            >
              <FiX size={14} />
            </button>
          </div>

          {/* Icon badge for special steps */}
          {step.icon === "welcome" && (
            <div style={{
              width: "48px", height: "48px", borderRadius: "14px",
              background: "linear-gradient(135deg, #ede9fe, #c4b5fd)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "1rem",
            }}>
              <FiZap size={21} style={{ color: "#7c3aed" }} />
            </div>
          )}
          {step.icon === "done" && (
            <div style={{
              width: "48px", height: "48px", borderRadius: "14px",
              background: "linear-gradient(135deg, #dcfce7, #86efac)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "1rem",
            }}>
              <FiCheckCircle size={21} style={{ color: "#16a34a" }} />
            </div>
          )}

          {/* Title + description */}
          <h3 style={{
            fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "700",
            color: "#0f172a", margin: "0 0 0.45rem", letterSpacing: "-0.01em", lineHeight: "1.35",
          }}>
            {step.title}
          </h3>
          <p style={{
            fontSize: "13px", color: "#64748b", lineHeight: "1.72",
            margin: "0 0 1.25rem", fontFamily: "'Inter', sans-serif",
          }}>
            {step.desc}
          </p>

          {/* Dot progress */}
          <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginBottom: "1.1rem" }}>
            {steps.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === stepIdx ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "99px",
                  background: i === stepIdx ? "#7c3aed" : i < stepIdx ? "#c4b5fd" : "#e5e7eb",
                  transition: "all 0.32s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {stepIdx > 0 && (
              <button
                onClick={back}
                style={{
                  flex: 1, padding: "9px 0", borderRadius: "9px",
                  border: "1.5px solid #e5e7eb", background: "#fff",
                  color: "#64748b", fontSize: "13px", fontWeight: "600",
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "5px",
                  fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c4b5fd"; e.currentTarget.style.color = "#7c3aed"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#64748b"; }}
              >
                <FiArrowLeft size={13} /> Retour
              </button>
            )}
            <button
              onClick={advance}
              style={{
                flex: 2, padding: "10px 0", borderRadius: "9px",
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                color: "#fff", border: "none",
                fontSize: "13px", fontWeight: "700",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: "6px",
                fontFamily: "'Inter', sans-serif",
                boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 22px rgba(124,58,237,0.48)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {isLast
                ? <><FiCheckCircle size={14} /> Terminer</>
                : <>Suivant <FiArrowRight size={13} /></>
              }
            </button>
          </div>

          {!isLast && stepIdx < total - 2 && (
            <button
              onClick={complete}
              style={{
                display: "block", width: "100%", marginTop: "9px",
                background: "none", border: "none", color: "#94a3b8",
                fontSize: "11.5px", cursor: "pointer", textAlign: "center",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Passer le tutoriel
            </button>
          )}
        </div>
      </div>
    </>
  );
}

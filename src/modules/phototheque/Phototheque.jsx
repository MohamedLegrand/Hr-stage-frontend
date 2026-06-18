import { useState, useEffect } from "react";
import Heros from "./components/Heros";
import Bureaux from "./components/Bureaux";
import Equipe from "./components/Equipe";
import Equipement from "./components/Equipement";
import Header from "../../shared/components/Header";
import Footer from "@/shared/components/footer";
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from "react-icons/fi";

export default function PhotothequePage() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (item, allItems) => {
    const index = allItems.findIndex((i) => i.id === item.id);
    setLightbox({ item, items: allItems, index });
  };

  const closeLightbox = () => setLightbox(null);

  const go = (dir) => {
    if (!lightbox) return;
    const len = lightbox.items.length;
    const next = (lightbox.index + dir + len) % len;
    setLightbox({ ...lightbox, item: lightbox.items[next], index: next });
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <div style={{ minHeight: "100vh", background: "#faf5ff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <Header />
      <Heros />
      <Bureaux onImageClick={(item, items) => openLightbox(item, items)} />
      <Equipe onImageClick={(item, items) => openLightbox(item, items)} />
      <Equipement onImageClick={(item, items) => openLightbox(item, items)} />
      <Footer />

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(9,3,20,0.94)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "2rem",
          }}
        >
          {/* Fermer */}
          <button
            onClick={closeLightbox}
            style={{
              position: "fixed", top: "20px", right: "20px", zIndex: 1001,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%", width: "44px", height: "44px",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          >
            <FiX size={18} />
          </button>

          {/* Compteur */}
          <div
            style={{
              position: "fixed", top: "24px", left: "50%", transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: "500",
              background: "rgba(255,255,255,0.06)", borderRadius: "99px",
              padding: "4px 14px", border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {lightbox.index + 1} / {lightbox.items.length}
          </div>

          {/* Flèche gauche */}
          {lightbox.items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                style={{
                  position: "fixed", left: "16px", top: "50%", transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "50%", width: "48px", height: "48px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", cursor: "pointer", transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.16)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              >
                <FiChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); go(1); }}
                style={{
                  position: "fixed", right: "16px", top: "50%", transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "50%", width: "48px", height: "48px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", cursor: "pointer", transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.16)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              >
                <FiChevronRight size={22} />
              </button>
            </>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "860px", width: "100%", textAlign: "center" }}
          >
            <img
              key={lightbox.item.image}
              src={lightbox.item.image}
              alt={lightbox.item.titre || lightbox.item.nom}
              style={{
                maxWidth: "100%", maxHeight: "75vh", objectFit: "contain",
                borderRadius: "14px", display: "block", margin: "0 auto",
                boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
              }}
              onError={(e) => { e.target.src = "https://placehold.co/800x600?text=Photo"; }}
            />
            <div style={{ marginTop: "1.25rem" }}>
              <div style={{ color: "#fff", fontSize: "16px", fontWeight: "600", fontFamily: "'Poppins', sans-serif" }}>
                {lightbox.item.titre || lightbox.item.nom}
              </div>
              {(lightbox.item.description || lightbox.item.poste) && (
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: "4px" }}>
                  {lightbox.item.description || lightbox.item.poste}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

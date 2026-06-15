import Heros from "./components/Heros";
import Bureaux from "./components/Bureaux";
import Equipe from "./components/Equipe";
import Equipement from "./components/Equipement";
import Header from "../../shared/components/Header";
import Footer from "@/shared/components/footer";

export default function PhotothequePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200">
      <Header />
      <Heros />
      <Bureaux />
      <Equipe />
      <Equipement />
      <Footer />
    </div>
  );
}
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./modules/landing/LandingPage";
import LoginPage from "./modules/auth/LoginPage";
import RegisterPage from "./modules/auth/RegisterPage";
import DashboardPage from "./modules/stagiaire/DashboardPage";
import AdminDashboardPage from "./modules/admin/AdminDashboardPage";
import PhotothequePage from "./modules/phototheque/Phototheque";
import ProgrammeDetail from "./modules/landing/pages/ProgrammeDetail";
import ContactPage from "./modules/contact/ContactPage";
import PourquoiPage from "./modules/pourquoi/PourquoiPage";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import AdminRoute from "./shared/components/AdminRoute";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/phototheque" element={<PhotothequePage />} />
        
        {/* Page de détail des programmes */}
        <Route path="/programme/:id" element={<ProgrammeDetail />} />

        {/* Pages publiques additionnelles */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pourquoi" element={<PourquoiPage />} />
        
        {/* Pages protégées - Stagiaire */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        
        {/* Pages protégées - Admin */}
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        } />
        
        {/* Redirection 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
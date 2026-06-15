import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./modules/landing/LandingPage";
import LoginPage from "./modules/auth/LoginPage";
import RegisterPage from "./modules/auth/RegisterPage";
import DashboardPage from "./modules/stagiaire/DashboardPage";
import AdminDashboardPage from "./modules/admin/AdminDashboardPage";
import PhotothequePage from "./modules/phototheque/Phototheque";
import ProgrammeDetail from "./modules/landing/pages/ProgrammeDetail";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import AdminRoute from "./shared/components/AdminRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/phototheque" element={<PhotothequePage />} />
        
        {/* Page de détail des programmes */}
        <Route path="/programme/:id" element={<ProgrammeDetail />} />
        
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
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingLayout from '../layouts/LandingLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import EmailVerificationPage from '../pages/auth/EmailVerificationPage';
import StudentDashboard from '../pages/dashboard/student/StudentDashboard';
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';

export default function AppRouter() {
  return (
    <Routes>
      {/* Landing Routes */}
      <Route
        path="/"
        element={
          <LandingLayout>
            <LandingPage />
          </LandingLayout>
        }
      />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        }
      />
      <Route
        path="/verify-email"
        element={
          <AuthLayout>
            <EmailVerificationPage />
          </AuthLayout>
        }
      />

      {/* Student Dashboard */}
      <Route
        path="/dashboard/student"
        element={
          <DashboardLayout>
            <StudentDashboard />
          </DashboardLayout>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/dashboard/admin"
        element={
          <DashboardLayout>
            <AdminDashboard />
          </DashboardLayout>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

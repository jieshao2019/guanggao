import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Games from './pages/Games';
import Ads from './pages/Ads';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import VIP from './pages/VIP';
import Wallet from './pages/Wallet';
import Friends from './pages/Friends';
import About from './pages/About';
import Help from './pages/Help';
import PrivateRoute from './components/PrivateRoute';

// Admin Pages
import AdminLayout from './components/admin/Layout';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import GameManagement from './pages/admin/GameManagement';
import AdManagement from './pages/admin/AdManagement';
import TransactionManagement from './pages/admin/TransactionManagement';
import ReportManagement from './pages/admin/ReportManagement';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="games" element={<GameManagement />} />
          <Route path="ads" element={<AdManagement />} />
          <Route path="transactions" element={<TransactionManagement />} />
          <Route path="reports" element={<ReportManagement />} />
        </Route>

        {/* Public Routes */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/vip" element={<VIP />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/friends" element={<Friends />} />
        </Route>
      </Routes>
      <Navbar />
    </div>
  );
}
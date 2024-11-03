import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, userData, userRole } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#112240] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-white">
              Defense Ledger
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white mr-4">
              Welcome, {userData?.username} ({userRole})
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center text-white hover:text-gray-300"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
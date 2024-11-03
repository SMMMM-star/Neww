import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import DynamicBackground from './DynamicBackground';

export default function Layout() {
  return (
    <div className="relative min-h-screen">
      <DynamicBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
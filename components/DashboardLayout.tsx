import React from 'react';
import { Header } from './reusableComponents/Header/header';
import { Sidebar } from './reusableComponents/Sidebar/sidebar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="d-flex">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="main-content-wrapper flex-grow-1">
        <Header />
        <div className="content-area p-4">
          {/* Main content will be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 
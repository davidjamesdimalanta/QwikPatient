import React from 'react';

const AdminPanel: React.FC = () => {
  const handleSettings = () => {
    // Implement settings management logic here
    console.log('Manage Settings clicked');
  };

  const handleReports = () => {
    // Implement report viewing logic here
    console.log('View Reports clicked');
  };

  return (
    <div className="admin-panel mb-8 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Functions</h2>
      <div className="flex space-x-4">
        <button
          onClick={handleSettings}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Manage Settings
        </button>
        <button
          onClick={handleReports}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          View Reports
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;

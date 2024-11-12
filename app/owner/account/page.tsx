'use client'

import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser, User } from '@/app/services/userService';
import AdminPanel from '@/app/components/admin/AdminPanel';
import UserManagement from '@/app/components/owner/UserManagement'; 

function OwnerDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userList = await getUsers();
      setUsers(userList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const user = await updateUser(updatedUser);
      setUsers(users.map(u => (u.id === user.id ? user : u)));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Owner Dashboard</h1>
      <AdminPanel />
      <UserManagement
        users={users}
        onDeleteUser={handleDeleteUser}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}

export default OwnerDashboard;

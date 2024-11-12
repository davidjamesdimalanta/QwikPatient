import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get('/api/users');
  return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete(`/api/users/${userId}`);
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await axios.put(`/api/users/${user.id}`, user);
  return response.data;
};

import TaskList from '@/app/components/admin/TaskList';
import TaskForm from '@/app/components/admin/TaskForm';

export default function TasksPage() {
  return (
    <div>
      <h1 className="text-2xl mb-4">Add New Task</h1>
      <TaskForm />
      <h1 className="text-2xl mb-4">Manage Tasks</h1>
      <TaskList />
    </div>
  );
}

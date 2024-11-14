import DeleteNurseForm from '@/app/components/admin/DeleteNurseForm'

export default function DeleteNursePage({nurseId}: {nurseId: string}) {
  return <DeleteNurseForm nurseId={nurseId} />;
}

import DeleteNurseForm from '@/app/components/admin/DeleteNurseForm'

export default function DeleteNursePage({ params }: { params: { id: string } }) {
  return <DeleteNurseForm nurseId={params.id} />;
}

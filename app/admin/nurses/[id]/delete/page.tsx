'use client'

import React from 'react';
import DeleteNurseForm from '@/app/components/admin/DeleteNurseForm'

type Props = {
  params: {
    id: string;
  };
};

export default function DeleteNursePage({ params }: Props) {
  return <DeleteNurseForm nurseId={params.id} />;
}

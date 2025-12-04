'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

const NoteDetailsClient = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id, 
  });

  if (isLoading) {
    return <p className={css.container}>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p className={css.container}>Something went wrong.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created: {note.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
'use client'; // <-- Обов'язково, бо тут є useState і useQuery

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './Notes.module.css'; 

const NotesClient = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 9, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (newValue: string) => {
    setSearch(newValue);
    setPage(1);
  };

  return (
    <div className={css.container}> 
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        
        {data && data.totalPages > 1 && (
             <Pagination 
              totalPages={data.totalPages} 
              currentPage={page} 
              onPageChange={setPage} 
            />
        )}

        <button 
          className={css.createBtn} 
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      {isLoading && !data && (
        <p style={{textAlign: 'center'}}>Loading notes...</p>
      )}
      
      {isError && <p style={{textAlign: 'center', color: 'red'}}>Error loading notes!</p>}

      {data && <NoteList notes={data.notes} />}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default NotesClient;
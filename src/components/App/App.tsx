import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';

import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';

const App = () => {
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
    <div className={css.app}>
      <header className={css.toolbar}>
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
      </header>

      {isLoading && !data && (
        <div style={{textAlign: 'center', margin: 10}}>Loading...</div>
      )}
      
      {isError && <p className={css.error}>Error loading notes!</p>}

      {data && (
          
          <NoteList notes={data.notes} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default App;
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import { createNote } from '@/lib/api'; 
import { CreateNoteDto } from '@/types/note';
import css from './NoteForm.module.css';


const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  content: Yup.string()
    .max(500, 'Too Long!'), 
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Required'),
});

interface NoteFormProps {
  onClose: () => void; 
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      
      onClose();
    },
  });

  const initialValues: CreateNoteDto = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={(values, { resetForm }) => {
       
        mutation.mutate(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <h2>Create new note</h2>
          
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} placeholder="Enter title..." />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={5}
              className={css.textarea}
              placeholder="Enter note content..."
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className={css.submitButton} 
              disabled={isSubmitting || mutation.isPending} 
            >
              {mutation.isPending ? 'Creating...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
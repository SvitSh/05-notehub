import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';

// ...

const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: createNote,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    onClose(); // Закриваємо модальне вікно після створення
  },
});

// ...

<Formik
  initialValues={{ title: '', content: '', tag: '' }}
  validationSchema={validationSchema}
  onSubmit={(values, actions) => {
    mutation.mutate(values);
    actions.setSubmitting(false);
  }}
>

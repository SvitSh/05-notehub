// src/components/NoteForm/NoteForm.tsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import { CreateNoteDto } from "../../services/noteService";

interface NoteFormProps {
  onClose: () => void;
  onSubmit?: () => void; // необов'язково
}

const NoteForm = ({ onClose, onSubmit }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteDto) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      if (onSubmit) onSubmit();
      onClose();
    },
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    tag: Yup.string()
      .oneOf(["personal", "work", "study"])
      .required("Tag is required"),
  });

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "personal" }}
      validationSchema={validationSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Title:
          <Field name="title" className={css.input} />
          <ErrorMessage name="title" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Content:
          <Field as="textarea" name="content" className={css.textarea} />
          <ErrorMessage name="content" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Tag:
          <Field as="select" name="tag" className={css.select}>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={css.error} />
        </label>

        <div className={css.buttons}>
          <button
            type="submit"
            className={css.submitBtn}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
          <button type="button" className={css.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;

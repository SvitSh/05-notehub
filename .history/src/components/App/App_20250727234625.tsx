import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

interface NoteFormValues {
  title: string;
  content: string;
  tag: "Todo" | "InProgress" | "Done";
}

interface NoteFormProps {
  onClose: () => void;
  onSubmit: () => void; // ДОДАЙ ЦЕЙ ПРОПС
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  tag: Yup.string().oneOf(["Todo", "InProgress", "Done"]).required(),
});

const NoteForm = ({ onClose, onSubmit }: NoteFormProps) => {
  const handleSubmit = async (
    values: NoteFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    // Тут повинен бути твій запит createNote(values)
    // await createNote(values); // якщо ти імпортувала функцію з noteService
    onSubmit();
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Title
          <Field name="title" className={css.input} />
        </label>

        <label className={css.label}>
          Content
          <Field name="content" as="textarea" className={css.textarea} />
        </label>

        <label className={css.label}>
          Tag
          <Field name="tag" as="select" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </Field>
        </label>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancel}>
            Cancel
          </button>
          <button type="submit" className={css.submit}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;

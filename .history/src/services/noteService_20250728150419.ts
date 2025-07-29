import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

type NoteFormProps = {
  onClose: () => void;
  onSubmit: (data: { title: string; text: string }) => void;
};

const NoteForm = ({ onClose, onSubmit }: NoteFormProps) => {
  const initialValues = {
    title: "",
    text: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    text: Yup.string().required("Text is required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    onSubmit(values);
    onClose();
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          ❌
        </button>
        <h2 className={css.title}>Create a new note</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <label className={css.label}>
              Title:
              <Field className={css.input} name="title" />
              <ErrorMessage
                className={css.error}
                name="title"
                component="div"
              />
            </label>
            <label className={css.label}>
              Text:
              <Field className={css.input} as="textarea" name="text" />
              <ErrorMessage className={css.error} name="text" component="div" />
            </label>
            <button className={css.submitBtn} type="submit">
              Save note
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default NoteForm;

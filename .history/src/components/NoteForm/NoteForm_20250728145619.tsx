// src/components/NoteForm/NoteForm.tsx

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  text: Yup.string().required("Text is required"),
  tag: Yup.mixed<"Todo" | "InProgress" | "Done">()
    .oneOf(["Todo", "InProgress", "Done"])
    .required("Tag is required"),
});

export const NoteForm = ({ onClose }: NoteFormProps) => {
  const initialValues = {
    title: "",
    text: "",
    tag: "Todo" as "Todo" | "InProgress" | "Done",
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Submitted", values);
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label>
          Title
          <Field name="title" />
        </label>
        <label>
          Text
          <Field name="text" as="textarea" />
        </label>
        <label>
          Tag
          <Field name="tag" as="select">
            <option value="Todo">Todo</option>
            <option value="InProgress">InProgress</option>
            <option value="Done">Done</option>
          </Field>
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
};

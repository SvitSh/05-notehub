import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmit: (data: { title: string; content: string }) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { title: "", content: "" },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      content: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <input
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        placeholder="Title"
      />
      <textarea
        name="content"
        value={formik.values.content}
        onChange={formik.handleChange}
        placeholder="Content"
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;

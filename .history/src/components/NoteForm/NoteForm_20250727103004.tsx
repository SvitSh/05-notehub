import React, { useState, useEffect } from "react";
import styles from "./NoteForm.module.css";
import { Note } from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
  onSubmit: (data: Note) => void;
  initialData?: Note | null;
}

const NoteForm: React.FC<NoteFormProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const note: Note = {
      id: initialData?.id || "",
      title,
      content,
    };

    onSubmit(note);
    onClose();
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{initialData ? "Edit Note" : "New Note"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className={styles.buttons}>
          <button type="submit">{initialData ? "Update" : "Create"}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;

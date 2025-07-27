import { useState } from "react";
import styles from "./NoteForm.module.css";
import { Note } from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
  onSubmit: (note: Note) => void;
  initialData?: Note;
}

const NoteForm = ({ onClose, onSubmit, initialData }: NoteFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const note: Note = {
      id: initialData?.id || crypto.randomUUID(),
      title,
      content,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSubmit(note);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.textarea}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className={styles.buttons}>
        <button type="submit" className={styles.submit}>
          Save
        </button>
        <button type="button" className={styles.cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;

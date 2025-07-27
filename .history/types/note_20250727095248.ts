export interface Note {
  id: string;
  title: string;
  content: string;
}

export interface FetchNotesResponse {
  notes: Note[];
}

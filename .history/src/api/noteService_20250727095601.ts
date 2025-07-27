import axios from "axios";

export const fetchNotes = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );
  return response.data;
};

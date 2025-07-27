// /api/notes.ts

let notes = [
  {
    id: "1",
    title: "Weekend Plans",
    content: "Go hiking, visit the beach, and relax at home.",
    tag: "Personal",
  },
  {
    id: "2",
    title: "Vacation Plans",
    content: "Plan a vacation to a tropical destination for relaxation.",
    tag: "Personal",
  },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method, query } = req;
  const page = Number(query.page || 1);
  const perPage = Number(query.perPage || 10);
  const search = (query.search as string)?.toLowerCase() || "";

  if (method === "GET") {
    const filtered = search
      ? notes.filter(
          (note) =>
            note.title.toLowerCase().includes(search) ||
            note.content.toLowerCase().includes(search)
        )
      : notes;

    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return res.status(200).json({
      notes: paginated,
      total: filtered.length,
    });
  }

  if (method === "POST") {
    const body = req.body;
    const newNote = {
      id: Date.now().toString(),
      ...body,
    };
    notes.push(newNote);
    return res.status(201).json(newNote);
  }

  if (method === "DELETE") {
    const id = query.id;
    notes = notes.filter((note) => note.id !== id);
    return res.status(200).json({ deletedId: id });
  }

  return res.status(405).end();
}

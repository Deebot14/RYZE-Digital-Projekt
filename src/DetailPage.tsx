// DetailPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const isLoggedIn = () => !!localStorage.getItem("loggedInUser");

type Entry = {
  id: number;
  title: string;
  date: string;
};

type EntryFormProps = {
  onSave: (entry: Entry) => void;
  editingEntry: Entry | null;
  clearEditing: () => void;
};

// Local state for form inputs
function EntryForm({ onSave, editingEntry, clearEditing }: EntryFormProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  // If "editingEntry" --> display form
  // If not --> clear form
  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title);
      setDate(editingEntry.date);
    } else {
      setTitle("");
      setDate("");
    }
  }, [editingEntry]);

  // Make sure fields are not empty
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    // Then SAVE new/updated entry and CLEAR form
    onSave({ id: editingEntry?.id || Date.now(), title, date });
    clearEditing();
    setTitle("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        data-testid="title-input"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        data-testid="date-input"
      />
      <button type="submit">{editingEntry ? "Update" : "Add"}</button>
      {editingEntry && (
        <button
          type="button"
          onClick={() => {
            clearEditing();
            setTitle("");
            setDate("");
          }}
          style={{ marginLeft: 10 }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default function DetailPage() {
  // Initialize state for entries and editing logic
  const navigate = useNavigate();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  // Redirect to LoginPage if not authenticated
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  // Handle saving new entries or updating existing ones by ID
  const handleSave = (entry: Entry) => {
    setEntries((prev) => {
      const exists = prev.find((e) => e.id === entry.id);
      if (exists) {
        return prev.map((e) => (e.id === entry.id ? entry : e));
      }
      return [...prev, entry];
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Detail Page</h2>
      <EntryForm
        onSave={handleSave}
        editingEntry={editingEntry}
        clearEditing={() => setEditingEntry(null)}
      />
      <ul data-testid="entries-list">
        {entries.map(({ id, title, date }) => (
          <li key={id} style={{ marginBottom: 8 }}>
            <strong>{title}</strong> - {date}{" "}
            <button onClick={() => setEditingEntry({ id, title, date })}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

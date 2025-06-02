import React, { useState } from 'react';

type FormData = {
  title: string;
  text: string;
  date: string;
};

// A Component that expects "onSave". it takes "FormData" and returns "void"
type FormComponentProps = {
  onSave: (data: FormData) => void;
};

// Component Declaration - It receives "onSave"
const FormComponent: React.FC<FormComponentProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  // No Refresh after Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Empty Field Handeling
    if (!title || !text || !date) {
      setError('Please fill in all fields.');
      return;
    }

    // When no errors accur "onSave" function passed as a prop is called and given the form data
    onSave({ title, text, date });

    // Reset Form after Submit
    setTitle('');
    setText('');
    setDate('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label><br />
        <input
          type="text"
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)} // Update State
          required // ensures browser-level validation
        />
      </div>

      <div>
        <label>Text:</label><br />
        <textarea
          value={text}
          maxLength={300}
          onChange={(e) => setText(e.target.value)}
          required
          rows={6}
          cols={50}
        />

        <div>{text.length}/300</div> 
      </div>

      <div>
        <label>Date:</label><br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)} // YYYY-MM-DD Format
          required
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Save</button>
    </form>
  );
};

export default FormComponent; // Export Form Component to App.tsx
export type { FormData };

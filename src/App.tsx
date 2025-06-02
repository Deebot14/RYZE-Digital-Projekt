import React from 'react';
import FormComponent, { FormData } from './FormComponent'; // Import "FormData" from "FormComponent"

/* Main wrapper component for the page
 * Will be called by the form when submitted
 * Logs the submitted data */
const App: React.FC = () => {
  const handleFormSave = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  // Render form and pass "onSave" 
  return (
    <div style={{ padding: '2rem' }}>
      <h1>React Form</h1>
      <FormComponent onSave={handleFormSave} /> 
    </div>
  );
};

export default App;

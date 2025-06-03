import React, { JSX } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import DetailPage from "./DetailPage";

const isLoggedIn = () => !!localStorage.getItem("loggedInUser");

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();
  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/detail"
          element={
            <ProtectedRoute>
              <DetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

//*************************************************************************************
// COMMENT the Upper code ↑↑ and UNCOMMENT the lower code ↓↓ to test the form component
//*************************************************************************************

// import React, { useState } from "react";
// import FormComponent, { FormData } from "./FormComponent";

// const FormTest: React.FC = () => {
//   const [entries, setEntries] = useState<FormData[]>([]);

//   const handleSave = (data: FormData) => {
    
//       setEntries((prev) => [...prev, data]);  
//       console.log("New entry:", data);        
    
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Test Form Component</h2>
//       <FormComponent onSave={handleSave} />
//     </div>
//   );
// };

// export default FormTest;

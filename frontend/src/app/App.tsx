import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpForm from "./signup/page"; // Adjust the import path as necessary
import LoginForm from "./login/page"; // Create this component for the login page
import Dashboard from "./dashboard/page"; // Import the Dashboard component
import ApplicationForm from "./newapplication/page"; // Import the Application Form component

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newapplication" element={<ApplicationForm />} />{" "}
        {/* New route for Application Form */}
      </Routes>
    </Router>
  );
};

export default App;

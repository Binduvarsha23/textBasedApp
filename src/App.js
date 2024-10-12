import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import About from './components/About';
import {
  HashRouter as Router,  // Changed to HashRouter
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#333333';
      document.body.style.color = 'white';
      showAlert("Dark mode enabled", "success");
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      document.body.style.color = '#212529';
      showAlert("Light mode enabled", "success");
    }
  };

  return (
    <Router>
      {/* Navbar should always be visible */}
      <Navbar title="TextUtils" about="About Textutils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />

      {/* Use Routes to control what shows below the Navbar */}
      <div className="container my-3">
        <Routes>
          {/* Route for the homepage - shows TextForm */}
          <Route exact path="/" element={<TextForm heading="Enter the text to analyze" showAlert={showAlert} />} />
          
          {/* Route for the About page - only shows About component */}
          <Route exact path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
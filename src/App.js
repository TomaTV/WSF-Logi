import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Form from './components/FormWEC';
import FormRDD from './components/FormRDD';
import FormPizza from './components/FormPizza';
import Navbar from './components/Navbar';
import './styles/app.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} setUser={setUser} />}
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/home" element={user ? <Home /> : <Login setUser={setUser} />} />
          <Route path="/form-wec" element={user ? <Form user={user} /> : <Login setUser={setUser} />} />
          <Route path="/form-pizza" element={user ? <FormPizza user={user} /> : <Login setUser={setUser} />} />
          <Route path="/form-rdd" element={user ? <FormRDD user={user} /> : <Login setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
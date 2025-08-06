import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Community from './pages/Community';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Routes>
      <Route path="/" element={ <PrivateRoute><Community /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
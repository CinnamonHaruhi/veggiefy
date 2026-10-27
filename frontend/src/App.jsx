import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import axios from 'axios';
  import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';
import RegisterSuccess from './pages/RegisterSuccess.jsx';
import Products from './pages/Products.jsx';

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/registerSuccess' element={<RegisterSuccess/>}/>

        <Route element={<ProtectedRoutes user={user}/>}>
          <Route path='/admin/dashboard' element={ <AdminDashboard/>}/>
          <Route path='/admin/products' element={ <Products/> }/>
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App

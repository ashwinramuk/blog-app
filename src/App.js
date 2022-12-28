import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Routes/loginRoute/loginRoute"
import Register from "./Routes/RegisterRoute/RegisterRoute"
import ViewPosts from "./Routes/postRoute/showPosts"
import CreatePosts from "./Routes/postRoute/createPost"

import ProtectedRoutes from './Routes/ProtectedRoutes/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/posts/view" element={<ViewPosts/>}/>
            <Route path="/posts/create" element={<CreatePosts/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

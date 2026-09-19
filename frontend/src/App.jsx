import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Top from "./pages/Top";
import Login from "./pages/Login";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import PostForm from "./pages/PostForm";
import Register from "./pages/Register";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/:id/edit" element={<PostForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blog } from "./pages/Blog";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
import Landing from "./pages/Landing";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/blog/:id" element={<Blog />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
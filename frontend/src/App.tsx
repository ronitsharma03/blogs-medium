import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blog } from "./pages/Blog";
import { Landing } from "./pages/Landing";
import { Profile } from "./pages/Profile";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/blog/:id" element={<Blog />}/>
          <Route path="/profile/:username" element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Students from "./Students";
import UserRegister from "./UserRegister.js";

export default function App() {
  return (
    <div >
      <h1>Student Details</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< UserRegister />}></Route>
          <Route path='/login' element={< Auth />}></Route>
          <Route path='/students' element={< Students />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

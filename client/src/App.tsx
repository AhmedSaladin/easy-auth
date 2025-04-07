import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import Home from './pages/home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<SignIn />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route index element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

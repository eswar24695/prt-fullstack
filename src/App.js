import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './home_component/home';
import Login from './login_component/login';
import Signup from './sign_up_component/signup';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<Login/>}/>
      <Route path={"/signup"} element={<Signup/>}/>
      <Route path={"/home"} element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

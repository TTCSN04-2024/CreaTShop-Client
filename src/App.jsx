import { useRoutes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import InfoAccount from "./pages/InfoAccount";
import MainLayout from "./layout/MainLayout";
import NotFound from "./pages/NotFound";

function App() {
  const routers = useRoutes([
    {
      path:'/',
      element:<MainLayout/>,
      children:[
        {
          path: '',
          element: <Home/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/signup',
          element:<SignUp/>
        },
        {
          path:'/profile',
          element:<InfoAccount/>
        }
      ]
    },
    {
      path: '*',
      element: <NotFound/>
    }


  ])
  return (
    <>
      {routers}
    </>
  );
}

export default App;

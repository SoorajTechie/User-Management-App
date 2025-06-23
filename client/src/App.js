import AddUser from './adduser/AddUser';
import Update from './updateuser/Update';
import './App.css';
import User from './getuser/User';
import  {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './components/auth/Login';
import Register from "./components/auth/Register";


function App() {

  const route = createBrowserRouter([
   {
      path:"/",
      element:<Login/>

    },
    {
      path:"/user",
      element:<User/>,
    },
    {
      path:"/add",
      element:<AddUser/>,
    },
    {
      path:"update/:id",
      element:<Update/>
    },
    
    {
      path:"/register",
      element:<Register/>
    }

  ]);
  return (
    <div className="App">
      <h1 className='title'>User Managment System</h1>

        <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;

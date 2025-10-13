
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Features/Layout/Layout'
import Home from './Components/Home/Home'
import Users from './Components/Users/Users'
import Lessons from './Components/Lessons/Lessons'
import Setings from './Components/Settings/Setings'
import Login from './Components/Login/Login'
import { AuthContextProvider } from './Features/Context/Context.jsx/AuthContext'
import { UsersContextProvider } from './Features/Context/Context.jsx/AllContext'
import "tailwindcss";
import LessonDetails from './Components/LessonDetails/LessonDetails'

function App() {

  let router = createBrowserRouter([
    {
      path:"",element:<Layout/>,
      children:[
        {index:true,element:<Home/>},
        {path:"users",element:<Users/>},
        {path:"lessons",element:<Lessons/>},
        {path:"settings",element:<Setings/>},
        {path:"login",element:<Login/>},
        {path:"lessons/:id",element:<LessonDetails/>}
      ]
    }
  ])

  
  
  return (
    <>
    <AuthContextProvider>
      <UsersContextProvider>
<RouterProvider router={router}></RouterProvider>
      </UsersContextProvider>

    </AuthContextProvider>
      
    </>
  )
}

export default App

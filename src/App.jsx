
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Features/Layout/Layout'
import Home from './Components/Home/Home'
import Users from './Components/Users/Users'
import Lessons from './Components/Lessons/Lessons'
import Login from './Components/Login/Login'
import { AuthContextProvider } from './Features/Context/Auth/AuthContext'
import "tailwindcss";
import LessonDetails from './Components/Lessons/LessonDetails'
import Exams from './Components/Exams/Exams'
import AddLesson from './Components/Lessons/AddLesson'
import { Toaster } from 'react-hot-toast'
import ExamDetails from './Components/Exams/ExamDetails'
import AddExam from './Components/Exams/AddExam'
import Questions from './Components/Questions/Questions'
import QuestionDetails from './Components/Questions/QuestionDetails'
import AddQuestion from './Components/Questions/AddQuestion'
import TakeExam from './Components/Exams/TakeExam'
import ExamScore from './Components/Exams/ExamScore'
import UserDetails from './Components/Users/UserDetails'
import { LessonsContextProvider } from './Features/Context/Lessons/LessonsContext'
import { ExamsContextProvider } from './Features/Context/Exams/ExamsContext'
import { QuestionsContextProvider } from './Features/Context/Questions/QuestionsContext'
import { UsersContextProvider } from './Features/Context/Users/UsersContext'

function App() {

  let router = createBrowserRouter([
    {
      path:"",element:<Layout/>,
      children:[
        {index:true,element:<Home/>},
        {path:"users",element:<Users/>},
        {path:"lessons",element:<Lessons/>},
        
        {path:"login",element:<Login/>},
        {path:"lessons/:id",element:<LessonDetails/>},
        {path:"addlesson",element:<AddLesson/>},
        {path:"exams",element:<Exams/>},
        {path:"exams/:id",element:<ExamDetails/>},
         {path:"exams/take/:id",element:<TakeExam/>},
        {path:"addExam",element:<AddExam/>},
         {path:"exam-score",element:<ExamScore/>},
         {path:"/user/:id" ,element:<UserDetails />},

        {path:"questions",element:<Questions/>},
        {path:"questions/:id",element:<QuestionDetails/>},
        {path:"addquestion",element:<AddQuestion/>},
       
      ]
    }
  ])

  
  
  return (
    <>
    <AuthContextProvider>
      <QuestionsContextProvider>
      <ExamsContextProvider>
      <LessonsContextProvider>

 <UsersContextProvider>
<RouterProvider router={router}></RouterProvider>
<Toaster position="top-center" reverseOrder={false} />
      </UsersContextProvider>

      </LessonsContextProvider>
      </ExamsContextProvider>
      </QuestionsContextProvider>
     

    </AuthContextProvider>
      
    </>
  )
}

export default App

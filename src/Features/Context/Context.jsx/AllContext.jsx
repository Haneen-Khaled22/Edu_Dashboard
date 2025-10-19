// import { createContext, useContext, useState } from "react";
// import { useAuth } from "../Auth/AuthContext";
// import toast from "react-hot-toast";

// const UsersContext = createContext();

// export function UsersContextProvider({ children }) {
//   const [totalUsers, setTotalUsers] = useState([]);
//   const [totalLessons, setTotalLessons] = useState([]);
//    const [totalExams, setTotalExams] = useState([]);
//     const [totalQuestions, setTotalQuestions] = useState([]);

//    const { token } = useAuth();
  

//    //users
//   // get all users
//   const getAllUsers = async () => {
//     try {
     

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }
//       const response = await fetch("https://edu-master-psi.vercel.app/admin/all-user", {
//         headers: {
//           token: token
//         },
//       });

//       const data = await response.json();
//       console.log(data);

//       if (response.ok) {
//         setTotalUsers(data.data); // لو رجعوا بيانات بنحدث الستيت
//       } else {
//         console.error("Error fetching users:", data.message);
//       }

//       return data;
//     } catch (error) {
//       console.error("Fetch Users Error:", error);
//     }
//   };

//   // get user profile
//    const getUserProfile = async () => {
//     try {
     

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }
//       const response = await fetch("https://edu-master-psi.vercel.app/user/", {
//         headers: {
//           token: token
//         },
//       });

//       const data = await response.json();
//       console.log(data);

//       if (response.ok) {
//         setTotalUsers(data.data); // لو رجعوا بيانات بنحدث الستيت
//       } else {
//         console.error("Error fetching users:", data.message);
//       }

//       return data;
//     } catch (error) {
//       console.error("Fetch Users Error:", error);
//     }
//   };
//   //  Delete user
// const deleteUser = async (id) => {
//   try {
//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(
//       `https://edu-master-psi.vercel.app/user/`,
//       {
//         method: "DELETE",
//         headers: {
//           token: token,
//         },
//       }
//     );

//     const data = await response.json();
//     console.log("Delete user:", data);

//     if (response.ok) {
//       console.log("user deleted successfully");
//     } else {
//       console.error("Error deleting user:", data.message);
//     }

//     return data;
//   } catch (error) {
//     console.error("Delete user error:", error);
//   }
// };

// //update user
// const updateUser = async (id,updatedData) => {
//   try {

//     if (!token) {
//       console.error("No token found in localStorage");
//       toast.error("Authentication token not found!");
//       return;
//     }

//     const response = await fetch(`https://edu-master-psi.vercel.app/user/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         token, // ممكن تكتبها كده مباشرة
//       },
//       body: JSON.stringify(updatedData),
//     });

//     const data = await response.json();
//     console.log("Update user Response:", data);

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to update user");
//     }

//     toast.success("user updated successfully");
//     return data;
//   } catch (error) {
//     console.error(" updateuser Error:", error);
//     toast.error(error.message || "Something went wrong while updating user");
//   }
// };

//   // get all admins
//    const getAllAdmins = async () => {
//     try {
      

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }
//       const response = await fetch("https://edu-master-psi.vercel.app/admin/all-admin", {
//         headers: {
//           token: token
//         },
//       });

//       const data = await response.json();
//       console.log(data);

//       if (response.ok) {
//         setTotalUsers(data.data); // لو رجعوا بيانات بنحدث الستيت
//       } else {
//         console.error("Error fetching users:", data.message);
//       }

//       return data;
//     } catch (error) {
//       console.error("Fetch Users Error:", error);
//     }
//   };


//   // lessonns
//   // get all lessons
//  const getAllLessons = async (page = 1, limit = 10) => {
//   try {
   

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     // ✅ لو API عنده pagination
//     const response = await fetch(
//       `https://edu-master-psi.vercel.app/lesson?page=${page}&limit=${limit}`,
//       {
//         headers: {
//           token: token,
//         },
//       }
//     );

//     const data = await response.json();
//     console.log("Lessons Data:", data);

//     if (response.ok) {
//       // ✅ حفظ البيانات في الـ state
//       setTotalLessons(data.data || []);

//       // ✅ نرجع كل حاجة علشان الكومبوننت يستخدمها
//       return {
//         lessons: data.data || [],
//         pagination: data.pagination || { page: 1, total: 0, totalPages: 1 },
//       };
//     } else {
//       console.error("Error fetching lessons:", data.message);
//       return { lessons: [], pagination: {} };
//     }
//   } catch (error) {
//     console.error("Fetch Lessons Error:", error);
//     return { lessons: [], pagination: {} };
//   }
// };


//  // Get Lesson by ID
// const getLessonById = async (id) => {
//   try {
//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(
//       `https://edu-master-psi.vercel.app/lesson/${id}`,
//       {
//         headers: {
//           token: token,
//         },
//       }
//     );

//     const data = await response.json();
//     console.log("Lesson details:", data);

//     if (response.ok) {
//       console.log("Fetched lesson details successfully");
//       return data;
//     } else {
//       console.error("Error fetching lesson details:", data.message);
//     }

//     return data;
//   } catch (error) {
//     console.error("Fetch lesson detail error:", error);
//   }
// };

// //  Delete Lesson
// const deleteLesson = async (id) => {
//   try {
//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(
//       `https://edu-master-psi.vercel.app/lesson/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           token: token,
//         },
//       }
//     );

//     const data = await response.json();
//     console.log("Delete response:", data);

//     if (response.ok) {
//       console.log("Lesson deleted successfully");
//     } else {
//       console.error("Error deleting lesson:", data.message);
//     }

//     return data;
//   } catch (error) {
//     console.error("Delete lesson error:", error);
//   }
// };

// // add lesson
// const addLesson = async (lessonData) => {
//   try {
  

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch("https://edu-master-psi.vercel.app/lesson", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         token: token,  
//       },
//       body: JSON.stringify(lessonData), // lessonData هو object فيه كل البيانات
//     });

//     const data = await response.json();
//     console.log("Add Lesson Response:", data);

//     if (response.ok) {
//       console.log("✅ Lesson added successfully",data);
//       toast.success("Lesson added successfully")
//     } else {
//       console.error("❌ Error adding lesson:", data.message);
//       toast.error(data.message);
//     }

//     return data;
//   } catch (error) {
//     console.error("🚨 Add Lesson Error:", error);
//   }
// };

// //update lesson
// const updateLesson = async (id,updatedData) => {
//   try {

//     if (!token) {
//       console.error("No token found in localStorage");
//       toast.error("Authentication token not found!");
//       return;
//     }

//     const response = await fetch(`https://edu-master-psi.vercel.app/lesson/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         token, // ممكن تكتبها كده مباشرة
//       },
//       body: JSON.stringify(updatedData),
//     });

//     const data = await response.json();
//     console.log("Update Lesson Response:", data);

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to update lesson");
//     }

//     toast.success("Lesson updated successfully");
//     return data;
//   } catch (error) {
//     console.error(" updateLesson Error:", error);
//     toast.error(error.message || "Something went wrong while updating lesson");
//   }
// };


// // examss

// // get all exams
//  const getAllExams = async () => {
//   try {
   

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

    
//     const response = await fetch(
//       `https://edu-master-psi.vercel.app/exam`,
//       {
//         headers: {
//           token: token,
//         },
//       }
//     );

//     const data = await response.json();
//     console.log("Exams Data:", data);

//     if (response.ok) {
//       // ✅ حفظ البيانات في الـ state
//       setTotalExams(data.data || []);

//       // ✅ نرجع كل حاجة علشان الكومبوننت يستخدمها
//       return data;
//     } else {
//       console.error("Error fetching exams:", data.message);
     
//     }
//   } catch (error) {
//     console.error("Fetch exams Error:", error);
   
//   }
// };

//  // Get exam by ID
// const getExamById = async (id) => {
//   try {
//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(
//       `https://edu-master-psi.vercel.app/exam/get/${id}`,
//       {
//         headers: {
//           token: token,
//         },
//       }
//     );

//     const data = await response.json();
//     console.log("Exam details:", data);

//     if (response.ok) {
//       console.log("Fetched exam details successfully");
//       return data;
//     } else {
//       console.error("Error fetching exam details:", data.message);
//     }

//     return data;
//   } catch (error) {
//     console.error("Fetch exam detail error:", error);
//   }
// };

// // add exam
// const addExam = async (examData) => {
//   try {
  

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch("https://edu-master-psi.vercel.app/exam", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         token: token,  
//       },
//       body: JSON.stringify(examData), // lessonData هو object فيه كل البيانات
//     });

//     const data = await response.json();
//     console.log("Add exam Response:", data);

//     if (response.ok) {
//       console.log(" exam added successfully",data);
    
//     } else {
//       console.error("❌ Error adding exam:", data.message);
      
//     }

//     return data;
//   } catch (error) {
//     console.error("🚨 Add exam Error:", error);
//   }
// };

// //  Delete exam
// const deleteExam= async (id) => {
//   try {
//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(
//       `https://edu-master-psi.vercel.app/exam/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           token: token,
//         },
//       }
//     );

//     const data = await response.json();
//     console.log("Delete response:", data);

//     if (response.ok) {
//       console.log("Exam deleted successfully");
//     } else {
//       console.error("Error deleting exam:", data.message);
//     }

//     return data;
//   } catch (error) {
//     console.error("Delete exam error:", error);
//   }
// };

// //update exam

// const updateExam = async (id,updatedData) => {
//   try {

//     if (!token) {
//       console.error("No token found in localStorage");
//       toast.error("Authentication token not found!");
//       return;
//     }

//     const response = await fetch(`https://edu-master-psi.vercel.app/exam/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         token, // ممكن تكتبها كده مباشرة
//       },
//       body: JSON.stringify(updatedData),
//     });

//     const data = await response.json();
//     console.log("Update exam Response:", data);

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to update exam");
//     }

//     return data;
//   } catch (error) {
//     console.error(" updateExam Error:", error);
//   }
// };


// // start exam
// const startExam = async (id) => {
//   try {
//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(`https://edu-master-psi.vercel.app/studentExam/start/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         token: token,
//       },
//     });

//     const text = await response.text();
//     console.log("Raw Response:", text);

//     let data;
//     try {
//       data = JSON.parse(text);
//     } catch {
//       throw new Error("Server did not return valid JSON. Check endpoint path.");
//     }

//     if (response.ok) {
//       console.log("✅ Exam started successfully:", data);
//     } else {
//       console.error("❌ Error starting exam:", data.message || data);
//     }

//     return data;
//   } catch (error) {
//     console.error("🚨 startExam Error:", error);
//   }
// };


// // submit exam
// const submitExam = async (id,AnswerData) => {
//   try {
  

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(`https://edu-master-psi.vercel.app/studentExam/submit/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         token: token,  
//       },  
//       body: JSON.stringify(AnswerData),
//     });

//     const data = await response.json();
//     console.log("submit exam Response:", data);

//     if (response.ok) {
//       console.log(" exam submitted successfully",data);
    
//     } else {
//       console.error("❌ Error submit exam:", data.message);
      
//     }

//     return data;
//   } catch (error) {
//     console.error("🚨  submit  exam Error:", error);
//   }
// };

// // get remaining time 
// const getRemainingTime = async (id) => {
//   try {
  

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(`https://edu-master-psi.vercel.app/studentExam/exams/remaining-time/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         token: token,  
//       },  
      
//     });

//     const data = await response.json();
//     console.log("remaining time Response:", data);

//     if (response.ok) {
//       console.log(" remaining time responded  successfully",data);
    
//     } else {
//       console.error("❌ Error remaing time  exam:", data.message);
      
//     }

//     return data;
//   } catch (error) {
//     console.error("🚨 Error remaing time :", error);
//   }
// };
// // get exam score 
// const getExamScore = async (id) => {
//   try {
  

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(`https://edu-master-psi.vercel.app/studentExam/exams/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         token: token,  
//       },  
      
//     });

//     const data = await response.json();
//     console.log("exam score Response:", data);

//     if (response.ok) {
//       console.log(" exam score responded  successfully",data);
    
//     } else {
//       console.error("❌ Error exam score exam:", data.message);
      
//     }

//     return data;
//   } catch (error) {
//     console.error("🚨 Error exam score:", error);
//   }
// };
// // get exam score to student
// const getExamScoreToStudent = async (id) => {
//   try {
  

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(`https://edu-master-psi.vercel.app/studentExam/exams/score/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         token: token,  
//       },  
      
//     });

//     const data = await response.json();
//     console.log("exam score Response:", data);

//     if (response.ok) {
//       console.log(" exam score responded  successfully",data);
    
//     } else {
//       console.error("❌ Error exam score exam:", data.message);
      
//     }

//     return data;
//   } catch (error) {
//     console.error("🚨 Error exam score:", error);
//   }
// };


// //questions
// const getAllQuestions = async () => {
//   try {
//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(
//       `https://edu-master-psi.vercel.app/question`,
//       {
//         headers: {
//           token: token,
//         },
//       }
//     );

//     const data = await response.json();
//     console.log("Questions Data:", data);

//     if (response.ok) {
//       const questions = data.data || [];

//       // ✅ احفظ العدد فقط
//       setTotalQuestions(questions.length);

//       // ✅ ارجع الـ array عشان الكومبوننت تستخدمها
//       return questions;
//     } else {
//       console.error("Error fetching questions:", data.message);
//     }
//   } catch (error) {
//     console.error("Fetch questions Error:", error);
//   }
// };


//  // Get Question by ID
// const getQuestionById = async (id) => {
//   try {
//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(
//       `https://edu-master-psi.vercel.app/question/get/${id}`,
//       {
//         headers: {
//           token: token,
//         },
//       }
//     );

//     const data = await response.json();
//     console.log("question details:", data);

//     if (response.ok) {
//       console.log("Fetched question details successfully");
//       return data.data;
//     } else {
//       console.error("Error fetching question details:", data.message);
//     }

//     return data;
//   } catch (error) {
//     console.error("Fetch question detail error:", error);
//   }
// };

// //  Delete question
// const deleteQuestion= async (id) => {
//   try {
//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch(
//       `https://edu-master-psi.vercel.app/question/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           token: token,
//         },
//       }
//     );

//     const data = await response.json();
//     console.log("Delete response:", data);

//     if (response.ok) {
//       console.log("Question deleted successfully");
//     } else {
//       console.error("Error deleting question:", data.message);
//     }

//     return data;
//   } catch (error) {
//     console.error("Delete question error:", error);
//   }
// };

// //update question

// const updateQuestion = async (id,updatedData) => {
//   try {

//     if (!token) {
//       console.error("No token found in localStorage");
//       toast.error("Authentication token not found!");
//       return;
//     }

//     const response = await fetch(`https://edu-master-psi.vercel.app/question/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         token, // ممكن تكتبها كده مباشرة
//       },
//       body: JSON.stringify(updatedData),
//     });

//     const data = await response.json();
//     console.log("Update question Response:", data);

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to update exam");
//     }

//     return data;
//   } catch (error) {
//     console.error(" updateQuestion Error:", error);
//   }
// };

// // add question
// const addQuestion = async (questionData) => {
//   try {
  

//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     const response = await fetch("https://edu-master-psi.vercel.app/question", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         token: token,  
//       },
//       body: JSON.stringify(questionData), // lessonData هو object فيه كل البيانات
//     });

//     const data = await response.json();
//     console.log("Add question Response:", data);

//     if (response.ok) {
//       console.log(" question added successfully",data);
    
//     } else {
//       console.error("❌ Error adding question:", data.message);
      
//     }

//     return data;
//   } catch (error) {
//     console.error("🚨 Add question Error:", error);
//   }
// };





//   return (
//     <UsersContext.Provider value={{ totalUsers, setTotalUsers, getAllUsers,getAllAdmins,getAllLessons,totalLessons,setTotalLessons,getLessonById,deleteLesson,addLesson,getAllExams,totalExams,setTotalExams,updateLesson ,getExamById,addExam
//       ,deleteExam,updateExam,getAllQuestions,totalQuestions,setTotalQuestions,getQuestionById,updateQuestion,deleteQuestion,addQuestion,startExam,submitExam,getRemainingTime,getExamScore,getExamScoreToStudent,
//       getUserProfile,updateUser,deleteUser
//     }}>
//       {children}
//     </UsersContext.Provider>
//   );
// }
// export const useUsers = () => useContext(UsersContext);

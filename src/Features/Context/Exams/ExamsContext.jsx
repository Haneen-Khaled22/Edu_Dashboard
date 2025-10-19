import { createContext, useContext, useState } from "react";

import toast from "react-hot-toast";
import { useAuth } from "../Auth/AuthContext";

const ExamsContext = createContext();

export function ExamsContextProvider({ children }) {
 const [totalExams, setTotalExams] = useState([]);

  const { token } = useAuth();

 // examss
 
 // get all exams
  const getAllExams = async () => {
   try {
    
 
     if (!token) {
       console.error("No token found in localStorage");
       return;
     }
 
     
     const response = await fetch(
       `https://edu-master-psi.vercel.app/exam`,
       {
         headers: {
           token: token,
         },
       }
     );
 
     const data = await response.json();
     console.log("Exams Data:", data);
 
     if (response.ok) {
       // ✅ حفظ البيانات في الـ state
       setTotalExams(data.data || []);
 
       // ✅ نرجع كل حاجة علشان الكومبوننت يستخدمها
       return data;
     } else {
       console.error("Error fetching exams:", data.message);
       return { Exams: [] };
     }
   } catch (error) {
     console.error("Fetch exams Error:", error);
     return { Exams: [] };
   }
 };
 

 ///////////////////////////


  // Get exam by ID
 const getExamById = async (id) => {
   try {
     if (!token) {
       console.error("No token found in localStorage");
       return;
     }
 
     const response = await fetch(
       `https://edu-master-psi.vercel.app/exam/get/${id}`,
       {
         headers: {
           token: token,
         },
       }
     );
 
     const data = await response.json();
     console.log("Exam details:", data);
 
     if (response.ok) {
       console.log("Fetched exam details successfully");
       return data;
     } else {
       console.error("Error fetching exam details:", data.message);
     }
 
     return data;
   } catch (error) {
     console.error("Fetch exam detail error:", error);
   }
 };

 //////////////////////
 
 // add exam
 const addExam = async (examData) => {
   try {
   
 
     if (!token) {
       console.error("No token found in localStorage");
       return;
     }
 
     const response = await fetch("https://edu-master-psi.vercel.app/exam", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         token: token,  
       },
       body: JSON.stringify(examData), // lessonData هو object فيه كل البيانات
     });
 
     const data = await response.json();
     console.log("Add exam Response:", data);
 
     if (response.ok) {
       console.log(" exam added successfully",data);
     
     } else {
       console.error("❌ Error adding exam:", data.message);
       
     }
 
     return data;
   } catch (error) {
     console.error("🚨 Add exam Error:", error);
   }
 };

 //////////////////////////
 
 //  Delete exam
 const deleteExam= async (id) => {
   try {
     if (!token) {
       console.error("No token found in localStorage");
       return;
     }
 
     const response = await fetch(
       `https://edu-master-psi.vercel.app/exam/${id}`,
       {
         method: "DELETE",
         headers: {
           token: token,
         },
       }
     );
 
     const data = await response.json();
     console.log("Delete response:", data);
 
     if (response.ok) {
       console.log("Exam deleted successfully");
     } else {
       console.error("Error deleting exam:", data.message);
     }
 
     return data;
   } catch (error) {
     console.error("Delete exam error:", error);
   }
 };

 //////////////////////////////
 
 //update exam
 
 const updateExam = async (id,updatedData) => {
   try {
 
     if (!token) {
       console.error("No token found in localStorage");
       toast.error("Authentication token not found!");
       return;
     }
 
     const response = await fetch(`https://edu-master-psi.vercel.app/exam/${id}`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
         token, // ممكن تكتبها كده مباشرة
       },
       body: JSON.stringify(updatedData),
     });
 
     const data = await response.json();
     console.log("Update exam Response:", data);
 
     if (!response.ok) {
       throw new Error(data.message || "Failed to update exam");
     }
 
     return data;
   } catch (error) {
     console.error(" updateExam Error:", error);
   }
 };


 //////////////////////////
 
 
 // start exam
 const startExam = async (id) => {
   try {
     if (!token) {
       console.error("No token found in localStorage");
       return;
     }
 
     const response = await fetch(`https://edu-master-psi.vercel.app/studentExam/start/${id}`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         token: token,
       },
     });
 
     const text = await response.text();
     console.log("Raw Response:", text);
 
     let data;
     try {
       data = JSON.parse(text);
     } catch {
       throw new Error("Server did not return valid JSON. Check endpoint path.");
     }
 
     if (response.ok) {
       console.log("✅ Exam started successfully:", data);
     } else {
       console.error("❌ Error starting exam:", data.message || data);
     }
 
     return data;
   } catch (error) {
     console.error("🚨 startExam Error:", error);
   }
 };
 

 ////////////////////////////
 
 // submit exam
 const submitExam = async (id,AnswerData) => {
   try {
   
 
     if (!token) {
       console.error("No token found in localStorage");
       return;
     }
 
     const response = await fetch(`https://edu-master-psi.vercel.app/studentExam/submit/${id}`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         token: token,  
       },  
       body: JSON.stringify(AnswerData),
     });
 
     const data = await response.json();
     console.log("submit exam Response:", data);
 
     if (response.ok) {
       console.log(" exam submitted successfully",data);
     
     } else {
       console.error("❌ Error submit exam:", data.message);
       
     }
 
     return data;
   } catch (error) {
     console.error("🚨  submit  exam Error:", error);
   }
 };

 /////////////////////////////////
 
 // get remaining time 
 const getRemainingTime = async (id) => {
   try {
   
 
     if (!token) {
       console.error("No token found in localStorage");
       return;
     }
 
     const response = await fetch(`https://edu-master-psi.vercel.app/studentExam/exams/remaining-time/${id}`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         token: token,  
       },  
       
     });
 
     const data = await response.json();
     console.log("remaining time Response:", data);
 
     if (response.ok) {
       console.log(" remaining time responded  successfully",data);
     
     } else {
       console.error("❌ Error remaing time  exam:", data.message);
       
     }
 
     return data;
   } catch (error) {
     console.error("🚨 Error remaing time :", error);
   }
 };

 /////////////////////////////

 // get exam score 
 const getExamScore = async (id) => {
   try {
   
 
     if (!token) {
       console.error("No token found in localStorage");
       return;
     }
 
     const response = await fetch(`https://edu-master-psi.vercel.app/studentExam/exams/${id}`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         token: token,  
       },  
       
     });
 
     const data = await response.json();
     console.log("exam score Response:", data);
 
     if (response.ok) {
       console.log(" exam score responded  successfully",data);
     
     } else {
       console.error("❌ Error exam score exam:", data.message);
       
     }
 
     return data;
   } catch (error) {
     console.error("🚨 Error exam score:", error);
   }
 };

 ////////////////////////

 // get exam score to student
 const getExamScoreToStudent = async (id) => {
   try {
   
 
     if (!token) {
       console.error("No token found in localStorage");
       return;
     }
 
     const response = await fetch(`https://edu-master-psi.vercel.app/studentExam/exams/score/${id}`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         token: token,  
       },  
       
     });
 
     const data = await response.json();
     console.log("exam score Response:", data);
 
     if (response.ok) {
       console.log(" exam score responded  successfully",data);
     
     } else {
       console.error("❌ Error exam score exam:", data.message);
       
     }
 
     return data;
   } catch (error) {
     console.error("🚨 Error exam score:", error);
   }
 };

  return (
    <ExamsContext.Provider
      value={{
       totalExams,
       setTotalExams,
       getAllExams,
       getExamById,
       deleteExam,
       submitExam,
       startExam,
       addExam,
       updateExam,
       getExamScore,
       getRemainingTime,
       getExamScoreToStudent
      }}
    >
      {children}
    </ExamsContext.Provider>
  );
}

export const useExams = () => useContext(ExamsContext);
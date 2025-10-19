import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../Auth/AuthContext";

const QuestionsContext = createContext();

export function QuestionsContextProvider({ children }) {
   const [totalQuestions, setTotalQuestions] = useState([]);

  const { token } = useAuth();

  //questions
  const getAllQuestions = async () => {
    try {
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
  
      const response = await fetch(
        `https://edu-master-psi.vercel.app/question`,
        {
          headers: {
            token: token,
          },
        }
      );
  
      const data = await response.json();
      console.log("Questions Data:", data);
  
      if (response.ok) {
        const questions = data.data || [];
  
        // ✅ احفظ العدد فقط
        setTotalQuestions(questions.length);
  
        // ✅ ارجع الـ array عشان الكومبوننت تستخدمها
        return questions;
      } else {
        console.error("Error fetching questions:", data.message);
      }
    } catch (error) {
      console.error("Fetch questions Error:", error);
    }
  };
  

  /////////////////////////
  
   // Get Question by ID
  const getQuestionById = async (id) => {
    try {
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
  
      const response = await fetch(
        `https://edu-master-psi.vercel.app/question/get/${id}`,
        {
          headers: {
            token: token,
          },
        }
      );
  
      const data = await response.json();
      console.log("question details:", data);
  
      if (response.ok) {
        console.log("Fetched question details successfully");
        return data.data;
      } else {
        console.error("Error fetching question details:", data.message);
      }
  
      return data;
    } catch (error) {
      console.error("Fetch question detail error:", error);
    }
  };
  

  //////////////////////


  //  Delete question
  const deleteQuestion= async (id) => {
    try {
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
  
      const response = await fetch(
        `https://edu-master-psi.vercel.app/question/${id}`,
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
        console.log("Question deleted successfully");
      } else {
        console.error("Error deleting question:", data.message);
      }
  
      return data;
    } catch (error) {
      console.error("Delete question error:", error);
    }
  };

  ////////////////////////
  
  //update question
  
  const updateQuestion = async (id,updatedData) => {
    try {
  
      if (!token) {
        console.error("No token found in localStorage");
        toast.error("Authentication token not found!");
        return;
      }
  
      const response = await fetch(`https://edu-master-psi.vercel.app/question/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token, // ممكن تكتبها كده مباشرة
        },
        body: JSON.stringify(updatedData),
      });
  
      const data = await response.json();
      console.log("Update question Response:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to update exam");
      }
  
      return data;
    } catch (error) {
      console.error(" updateQuestion Error:", error);
    }
  };

  //////////////////////
  
  // add question
  const addQuestion = async (questionData) => {
    try {
    
  
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
  
      const response = await fetch("https://edu-master-psi.vercel.app/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,  
        },
        body: JSON.stringify(questionData), // lessonData هو object فيه كل البيانات
      });
  
      const data = await response.json();
      console.log("Add question Response:", data);
  
      if (response.ok) {
        console.log(" question added successfully",data);
      
      } else {
        console.error("❌ Error adding question:", data.message);
        
      }
  
      return data;
    } catch (error) {
      console.error("🚨 Add question Error:", error);
    }
  };

  
  

  return (
    <QuestionsContext.Provider
      value={{
        totalQuestions,
        setTotalQuestions,
        getAllQuestions,
        getQuestionById,
        deleteQuestion,
        updateQuestion,
        addQuestion
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export const useQuestions = () => useContext(QuestionsContext);
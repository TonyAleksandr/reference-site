"use client";
import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { getAllTeachers, getAllStudents } from "../lib/users"; 

export default function Home() {  
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(true);
  const email = Cookies.get("email");
  const password = Cookies.get("password");

  useEffect(() => {
    const roles = async () => {
      try {
        const teachersResponse = await getAllTeachers();
        const studentsResponse = await getAllStudents();

        const isTeacherMatch = teachersResponse.data.some(item => item[1] === email);
        const isStudentMatch = studentsResponse.data.some(item => item[1] === email);
        
        setIsTeacher(isTeacherMatch);
        setIsStudent(isStudentMatch);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    roles();
  }, [email, password]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Добро пожаловать</h1>
        <p className="mb-8">Здесь вы можете подать заявки на получение справок.</p>
        {isStudent && (
          <a href="/create-order" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Перейти к формe заявки
          </a>
        )}
        {isTeacher && (
          <a href="/orders-panel" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Панель Заявок
          </a>
        )}
      </div>
    </>
  );
}

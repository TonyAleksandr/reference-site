"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { getAll, create } from "../lib/auth"; 
import { getAllStudents, getAllTeachers, getAllAdmins } from "../lib/users"

export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = Cookies.get("email");
    const password = Cookies.get("password");

    const checkUser = async () => {
      if (!email || !password) {
        setLoading(false);
        router.push('/sing-in');
        return;
      }

      try {
        const response = await getAll()
        const isMatchFound = response.data.some(item => item[1] === email && item[2] === password);
        
        if (!isMatchFound) {
          router.push('/sing-in');
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        router.push('/sing-in');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 animate__animated animate__fadeIn">
        <h1 className="text-2xl font-bold text-gray-700">Загрузка...</h1>
      </div>
    );
  }

  return <>{children}</>;
};



export const TeacherRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = Cookies.get("email");
    const password = Cookies.get("password");

    const checkUser = async () => {
      if (!email || !password) {
        setLoading(false);
        router.push('/sing-in');
        return;
      }

      try {
        const response = await getAllTeachers()
        const isMatchFound = response.data.some(item => item[1] === email);
        
        if (!isMatchFound) {
          router.push('/sing-in');
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        router.push('/sing-in');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 animate__animated animate__fadeIn">
        <h1 className="text-2xl font-bold text-gray-700">Загрузка...</h1>
      </div>
    );
  }

  return <>{children}</>;
};



export const StudentRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = Cookies.get("email");
    const password = Cookies.get("password");

    const checkUser = async () => {
      if (!email || !password) {
        setLoading(false);
        router.push('/sing-in');
        return;
      }

      try {
        const response = await getAllStudents();
        const isMatchFound = response.data.some(item => item[1] === email);
        
        if (!isMatchFound) {
          router.push('/sing-in');
        }
      } catch (error) {
        console.log("Error fetching users:", error);
        router.push('/sing-in');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 animate__animated animate__fadeIn">
        <h1 className="text-2xl font-bold text-gray-700">Загрузка...</h1>
      </div>
    );
  }

  return <>{children}</>;
};


export const AdminRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = Cookies.get("email");
    const password = Cookies.get("password");

    const checkUser = async () => {
      if (!email || !password) {
        setLoading(false);
        router.push('/sing-in');
        return;
      }

      try {
        const response = await getAllAdmins();
        const isMatchFound = response.data.some(item => item[1] === email);
        
        if (!isMatchFound) {
          router.push('/sing-in');
        }
      } catch (error) {
        console.log("Error fetching users:", error);
        router.push('/sing-in');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 animate__animated animate__fadeIn">
        <h1 className="text-2xl font-bold text-gray-700">Загрузка...</h1>
      </div>
    );
  }

  return <>{children}</>;
};

"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { getAll } from "../lib/auth"; 
import { getAllStudents, getAllTeachers } from "../lib/users";

export default function Header() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isTeacher, setIsTeacher] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const email = Cookies.get("email");
    const password = Cookies.get("password");

    useEffect(() => {
        const checkUser = async () => {
            if (!email || !password) {
                setLoading(false);
                return;
            }

            try {
                const response = await getAll();
                const isMatchFound = response.data.some(item => item[1] === email && item[2] === password);
                setIsAuthenticated(isMatchFound);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [email, password]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const teachersResponse = await getAllTeachers();
                const studentsResponse = await getAllStudents();
                
                const teachers = teachersResponse.data;
                const students = studentsResponse.data;
                setIsStudent(students.some(item => item[1] === email));
                setIsTeacher(teachers.some(item => item[1] === email));
                
            } catch (error) {
                console.error("Error fetching students or teachers:", error);
            }
        };

        fetchRoles();
    }, [email, password]);

    if (loading) {
        return <div>Loading...</div>; // Можете добавить индикатор загрузки
    }

    return (
        <header className="bg-blue-500 text-white py-2 fixed top-0 left-0 w-full z-10">
            <div className="flex justify-between px-4">
                <div>
                    <button onClick={() => router.push('/')} className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg">Главная</button>
                    {isStudent && (
                        <>
                            <button onClick={() => router.push('/my-orders')} className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg">Заказы</button>

                            <button onClick={() => router.push('/create-order')} className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg">Оформить заявку</button>
                        </>
                    )}
                    {isTeacher && (
                        <button onClick={() => router.push('/orders-panel')} className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg">Панель Заказов</button>
                    )}
                </div>
                <div>
                    {isAuthenticated ? ( 
                        <button onClick={() => router.push('/sing-out')} className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg">Выйти</button>
                    ) : (
                        <button onClick={() => router.push('/sing-in')} className="px-2 py-1 mx-2 rounded-lg">Войти</button>
                    )}
                </div>
            </div>
        </header>
    );
}

"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { getAll } from "../lib/auth"; 
import { getAllAdmins, getAllStudents, getAllTeachers } from "../lib/users";
import { createClick } from "../lib/logs"; 

export default function Header() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isTeacher, setIsTeacher] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
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
                const adminsResponse = await getAllAdmins();
                
                const teachers = teachersResponse.data;
                const students = studentsResponse.data;
                const admins = adminsResponse.data;
                setIsStudent(students.some(item => item[1] === email));
                setIsTeacher(teachers.some(item => item[1] === email));
                setIsAdmin(admins.some(item => item[1] === email));
            } catch (error) {
                console.error("Error fetching students or teachers:", error);
            }
        };

        fetchRoles();
    }, [email, password]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <header className="bg-blue-500 text-white py-2 fixed top-0 left-0 w-full z-10">
            <div className="flex justify-between items-center px-4">
                <div className="flex items-center">
                    <a
                        onClick={async (e) => {
                            e.preventDefault(); // Предотвращаем переход по умолчанию
                            router.push('/');
                            await createClick(email, "Главная");
                        }}
                        className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg flex items-center"
                        href="/" // Добавляем href для доступности
                    >
                        <Image
                            className="mw-logo-icon rounded-full transition-transform duration-200 hover:scale-110 mr-2"
                            src={require("../app/favicon.ico")}
                            alt="Главная"
                            aria-hidden="true"
                            height={34}
                            width={34}
                        />
                    </a>
                    <button
                        onClick={async () => {
                            router.push('/notifications');
                            await createClick(email, "Уведомления");
                        }}
                        className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg"
                    >
                        Уведомления
                    </button>
                    {isStudent && (
                        <>
                            <button
                                onClick={async () => {
                                    router.push('/my-orders');
                                    await createClick(email, "Заказы");
                                }}
                                className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg"
                            >
                                Заказы
                            </button>
                            <button
                                onClick={async () => {
                                    router.push('/create-order');
                                    await createClick(email, "Оформить заявку");
                                }}
                                className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg"
                            >
                                Оформить заявку
                            </button>
                        </>
                    )}
                    {isTeacher && (
                        <button
                            onClick={async () => {
                                router.push('/orders-panel');
                                await createClick(email, "Панель Заказов");
                            }}
                            className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg"
                        >
                            Панель Заказов
                        </button>
                    )}
                    {isAdmin && (
                        <button
                            onClick={async () => {
                                router.push('/admin');
                                await createClick(email, "Админ панель");
                            }}
                            className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg"
                        >
                            Админ панель
                        </button>
                    )}
                </div>
                <div>
                    {isAuthenticated ? (
                        <button
                            onClick={async () => {
                                router.push('/sing-out');
                                await createClick(email, "Выйти");
                            }}
                            className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg"
                        >
                            Выйти
                        </button>
                    ) : (
                        <button
                            onClick={async () => {
                                router.push('/sing-in');
                                await createClick(email, "Войти");
                            }}
                            className="px-2 py-1 mx-2 rounded-lg"
                        >
                            Войти
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

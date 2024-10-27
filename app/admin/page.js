"use client";
import React, { useEffect, useState } from 'react';
import { AdminRoute } from "../../components/ProtectedRoute"; 
import { getAllUsers, getAllStudents, getAllTeachers, fetchStudent, fetchTeacher, createStudent, deleteStudent, createTeacher, deleteTeacher } from "../../lib/users"; 
import { getAll, createLog } from "../../lib/logs";
import Header from "../../components/Header";

const TimestampDisplay = ({ timestamp }) => {
    const timestampInMilliseconds = timestamp * 1000;
    const date = new Date(timestampInMilliseconds);
    const formattedDate = date.toLocaleString(); 
    return formattedDate;
};

export default function AccountsPanel() {
    const [accounts, setAccounts] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [studentExists, setStudentExists] = useState(false);
    const [teacherExists, setTeacherExists] = useState(false);
    const [logs, setLogs] = useState([]);

    const fetchAccounts = async () => {
        try {
            const response = await getAllUsers();
            setAccounts(response.data);
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await getAllStudents();
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await getAllTeachers();
            setTeachers(response.data);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    const fetchlogs = async () => {
        const dbLogs = (await getAll()).data
        logs.sort((a, b) => {
            return b[2] - a[2];
        });
        setLogs(dbLogs);
    };

    useEffect(() => {
        fetchAccounts();
        fetchStudents();
        fetchTeachers();
        fetchlogs();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedAccount) {
                const student = await fetchStudent(selectedAccount[1]);
                const teacher = await fetchTeacher(selectedAccount[1]);

                setStudentExists(!!student);
                setTeacherExists(!!teacher);
            }
        };

        fetchData();
    }, [selectedAccount]);

    const handleRoleChange = (account) => {
        setSelectedAccount(account);
        setShowRoleModal(true);
    };

    const toggleRole = async (role) => {
        try {
            if (role === 'student') {
                studentExists ? await deleteStudent(selectedAccount[1]) : await createStudent(selectedAccount[1]);
                await createLog(selectedAccount[1], `${teacherExists ? "Удалена" : "Добавлена"} роль ученика`)
            } else if (role === 'teacher') {
                teacherExists ? await deleteTeacher(selectedAccount[1]) : await createTeacher(selectedAccount[1]);
                await createLog(selectedAccount[1], `${teacherExists ? "Удалена" : "Добавлена"} роль учителя`)
            }
            setShowRoleModal(false);
            fetchAccounts();
            fetchStudents();
            fetchTeachers();
            fetchlogs();
        } catch (error) {
            console.error(`Error toggling role ${role}:`, error);
        }
    };

    return (
        <AdminRoute>
            <Header />
            <div className="min-h-screen flex flex-col bg-gray-100 p-4">
                <h2 className="text-4xl font-bold mb-4 text-center mt-12">Все Аккаунты</h2>
                <div className="flex justify-center">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Имя</th>
                                <th className="border px-4 py-2">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account) => (
                                <tr key={account[0]}>
                                    <td className="border px-4 py-2 text-center">{account[0]}</td>
                                    <td className="border px-4 py-2 text-center">{account[1]}</td>
                                    <td className="border px-4 py-2 text-center">{account[4]}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <button 
                                            onClick={() => handleRoleChange(account)} 
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                        >
                                            Изменить роль
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Модал для изменения ролей */}
                {showRoleModal && (
                    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setShowRoleModal(false);
                            }
                        }}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold">Управление ролями для аккаунта ID: {selectedAccount[0]}</h2>
                            <div className="mt-4">
                                <table className="min-w-full table-auto border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="border px-4 py-2 text-left">Роль</th>
                                            <th className="border px-4 py-2 text-center">Действие</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border px-4 py-2">Студент</td>
                                            <td className="border px-4 py-2 text-center">
                                                <button 
                                                    className={`px-4 py-2 ${studentExists ? 'bg-red-500' : 'bg-green-500'} text-white rounded hover:${studentExists ? 'bg-red-700' : 'bg-green-700'}`}
                                                    onClick={() => toggleRole('student')}
                                                >
                                                    {studentExists ? 'Снять студента' : 'Назначить студентом'}
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2">Учитель</td>
                                            <td className="border px-4 py-2 text-center">
                                                <button 
                                                    className={`px-4 py-2 ${teacherExists ? 'bg-red-500' : 'bg-green-500'} text-white rounded hover:${teacherExists ? 'bg-red-700' : 'bg-green-700'}`}
                                                    onClick={() => toggleRole('teacher')}
                                                >
                                                    {teacherExists ? 'Снять учителя' : 'Назначить учителем'}
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button onClick={() => setShowRoleModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Закрыть</button>
                            </div>
                        </div>
                    </div>
                )}

                <h2 className="text-3xl font-bold mt-12">Список Студентов</h2>
                <div className="flex justify-center">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mt-4">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td className="border px-4 py-2 text-center">{student[0]}</td>
                                    <td className="border px-4 py-2 text-center">{student[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h2 className="text-3xl font-bold mt-12">Список Учителей</h2>
                <div className="flex justify-center">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mt-4">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher) => (
                                <tr key={teacher.id}>
                                    <td className="border px-4 py-2 text-center">{teacher[0]}</td>
                                    <td className="border px-4 py-2 text-center">{teacher[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                

                <h2 className="text-4xl font-bold mb-4 text-center mt-12">Логи сайта</h2>
                <div className="flex justify-center">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Действие</th>
                                <th className="border px-4 py-2">Дата и время</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log[0]}>
                                    <td className="border px-4 py-2 text-center">{log[0]}</td>
                                    <td className="border px-4 py-2 text-center">{log[1]}</td>
                                    <td className="border px-4 py-2 text-center">{log[2]}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <TimestampDisplay timestamp={log[3]}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminRoute>
    );
}
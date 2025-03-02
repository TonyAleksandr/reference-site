"use client";
import React, { useEffect, useState } from 'react';
import { ProtectedRoute } from "../../components/ProtectedRoute"; 
import { getAllNotifications } from "../../lib/users";
import Header from "../../components/Header";
import Cookies from 'js-cookie';

const TimestampDisplay = ({ timestamp }) => {
    const timestampInMilliseconds = timestamp * 1000;
    const date = new Date(timestampInMilliseconds);
    const formattedDate = date.toLocaleString(); 
    return formattedDate;
};

export default function AccountsPanel() {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotifi, setSelectedNotifi] = useState(null);
    const [showDesModal, setShowDesModal] = useState(false);
    const email = Cookies.get("email");

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await getAllNotifications(email);
            setNotifications(response.data);
        };
        fetchNotifications();
    }, [email]);

    const handleDecline = (order) => {
        setSelectedNotifi(order);
        setShowDesModal(true);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Скопировано: ' + text);
        }).catch(err => {
            console.error('Ошибка при копировании: ', err);
        });
    };

    return (
        <ProtectedRoute>
            <Header />
            <div className="min-h-screen flex flex-col bg-gray-100 p-4">
                <h2 className="text-4xl font-bold mb-4 text-center mt-12">Все уведомления</h2>
                <div className="flex justify-center">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Дата и время</th>
                                <th className="border px-4 py-2">Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map((notification) => (
                                <tr key={notification[0]}>
                                    <td className="border px-4 py-2 text-center">{notification[0]}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <TimestampDisplay timestamp={notification[3]} />
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button 
                                            onClick={() => handleDecline(notification)} 
                                            className="px-4 py-2 text-white rounded bg-gray-700 mr-2" 
                                        >
                                            Подробнее
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        
            {/* Модал для описания */}
            {showDesModal && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowDesModal(false);
                        }
                    }}
                >
                    <div className="bg-white p-6 rounded-lg shadow-md w-3/4 max-w-2xl"> 
                        <h2 className="text-lg font-bold">Уведомления {selectedNotifi[0]}</h2>
                        <div className="mt-4">
                            <span className="font-medium">Текст уведомления:</span>
                            <div className="flex justify-between items-center bg-gray-100 border p-2 rounded-md">
                                <p>{selectedNotifi[2]}</p>
                                <button onClick={() => copyToClipboard(selectedNotifi[2])} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Копировать</button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button onClick={() => setShowDesModal(false)} className="w-full px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-center">Закрыть</button>
                        </div>
                    </div>
                </div>
            )}
        </ProtectedRoute>
    );
}
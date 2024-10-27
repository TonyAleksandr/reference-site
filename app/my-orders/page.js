"use client";
import Header from "../../components/Header";
import React, { useEffect, useState } from 'react';
import { ProtectedRoute, StudentRoute } from "../../components/ProtectedRoute"; 
import { get, edit } from "../../lib/orders"; 
import Cookies from "js-cookie"; 

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const email = Cookies.get("email");

    const fetchOrders = async () => {
        try {
            const response = await get(email)
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDecline = (order) => {
        setSelectedOrder(order);
        setShowDeclineModal(true);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Скопировано: ' + text);
        }).catch(err => {
            console.error('Ошибка при копировании: ', err);
        });
    };
    return (
        <StudentRoute>
            <Header />
            <div className="min-h-screen flex flex-col bg-gray-100 p-4">
            <h2 className="text-4xl font-bold mb-4 text-center mt-12">Ваши Заказы</h2>
                <div className="flex justify-center">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Клиент</th>
                                <th className="border px-4 py-2">Статус</th>
                                <th className="border px-4 py-2">Подробнее</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="border px-4 py-2 text-center">{order[0]}</td>
                                    <td className="border px-4 py-2 text-center">{order[2]}</td>
                                    {
                                        order[7] === "new" ? <td className="border px-4 py-2 text-center text-blue-500">Создана</td> :
                                        order[7] === "yes" ? <td className="border px-4 py-2 text-center text-green-500">Одобрена</td> :
                                        order[7] === "no" ? <td className="border px-4 py-2 text-center text-red-500">Отклонена</td> :
                                        order[7]
                                    }
                                    <td className="border px-4 py-2 text-center">
                                        <button 
                                            onClick={() => handleDecline(order)}
                                            className="px-4 py-2  text-white rounded bg-gray-700 mr-2" 
                                        >
                                            Подробнее
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Модал для отклонения */}
                {showDeclineModal && (
                    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setShowDeclineModal(false);
                            }
                        }}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md w-3/4 max-w-2xl"> 
                            <h2 className="text-lg font-bold">Описание заявки №{selectedOrder[0]}</h2>


                            <div className="mt-4">
                                <span className="font-medium">Описание:</span>
                                <div className="flex justify-between items-center bg-gray-100 border p-2 rounded-md">
                                    <p>{selectedOrder[9]}</p>
                                    <button onClick={() => copyToClipboard(selectedOrder[9])} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Копировать</button>
                                </div>
                            </div>
                            {
                                selectedOrder[7] === "new" ? (
                                    <div className="mt-4">
                                        <span className="font-medium">Ответа ещё нет...</span>
                                    </div>):
                                selectedOrder[7] === "yes" ? (
                                    <div className="mt-4">
                                        <span className="font-medium">Ответ:</span>
                                        <div className="flex justify-between items-center bg-gray-100 border p-2 rounded-md">
                                            <p>{selectedOrder[8]}</p>
                                            <button onClick={() => copyToClipboard(selectedOrder[8])} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Копировать</button>
                                        </div>
                                    </div>) :
                                selectedOrder[7] === "no" ? (
                                    <div className="mt-4">
                                        <span className="font-medium">Причина отклонения:</span>
                                        <div className="flex justify-between items-center bg-gray-100 border p-2 rounded-md">
                                            <p>{selectedOrder[8]}</p>
                                            <button onClick={() => copyToClipboard(selectedOrder[8])} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Копировать</button>
                                        </div>
                                    </div>
                                ) :
                                selectedOrder[7]
                            }

                            <div className="mt-4">
                                <button onClick={() => setShowDeclineModal(false)} className="w-full px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-center">Закрыть</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </StudentRoute>
    );
}

"use client";
import React, { useEffect, useState } from 'react';
import { TeacherRoute } from "../../components/ProtectedRoute"; 
import { createNotification } from "../../lib/users";
import { get, edit } from "../../lib/orders"; 
import { createLog } from "../../lib/logs"; 
import Cookies from 'js-cookie';
import Header from "../../components/Header";

export default function OrdersPanel() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const [referenceData, setReferenceData] = useState('');
    const [declineReason, setDeclineReason] = useState('');

    const email = Cookies.get("email");

    const fetchOrders = async () => {
        try {
            const response = await get("all")
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleApprove = (order) => {
        setSelectedOrder(order);
        setShowApproveModal(true);
    };

    const handleDecline = (order) => {
        setSelectedOrder(order);
        setShowDeclineModal(true);
    };

    const submitApproval = async () => {
        try {
            await edit(selectedOrder[0], referenceData, "yes")
            setShowApproveModal(false);
            await createLog(email, `Принята заявка №${selectedOrder[0]}`)
            await createNotification(email,  `Заявка №${selectedOrder[0]} принята`)
            setReferenceData('');
            fetchOrders();
        } catch (error) {
            setShowApproveModal(false);
            setReferenceData('');
        }
    };

    const submitDecline = async () => {
        try {
            await edit(selectedOrder[0], declineReason, "no")
            setShowDeclineModal(false);
            await createLog(email, `Отклонена заявка №${selectedOrder[0]}`)
            await createNotification(email,  `Заявка №${selectedOrder[0]} отклонена`)
            setDeclineReason('');
            fetchOrders();
        } catch (error) {
            setShowDeclineModal(false);
            setDeclineReason('');
        }
    };

    const sortedOrders = orders.sort((a, b) => {
        if (a[7] === "new" && b[7] !== "new") return -1; // a выше b
        if (a[7] !== "new" && b[7] === "new") return 1;  // b выше a
        return 0; // оставляем порядок неизменным
    });

    return (
        <TeacherRoute>
            <Header />
            <div className="min-h-screen flex flex-col bg-gray-100 p-4">
                <h2 className="text-4xl font-bold mb-4 text-center mt-12">Все Заказы</h2>
                <div className="flex justify-center">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Клиент</th>
                                <th className="border px-4 py-2">Описание</th>
                                <th className="border px-4 py-2">Статус</th>
                                <th className="border px-4 py-2">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedOrders.map((order) => (
                                <tr key={order.id}>
                                    <td className="border px-4 py-2 text-center">{order[0]}</td>
                                    <td className="border px-4 py-2 text-center">{order[2]}</td>
                                    <td className="border px-4 py-2 text-center">{order[9]}</td>
                                    {
                                        order[7] === "new" ? <td className="border px-4 py-2 text-center text-blue-500">Создана</td> :
                                        order[7] === "yes" ? <td className="border px-4 py-2 text-center text-green-500">Одобрена</td> :
                                        order[7] === "no" ? <td className="border px-4 py-2 text-center text-red-500">Отклонена</td> :
                                        order[7]
                                    }
                                    <td className="border px-4 py-2 text-center">
                                        <button 
                                            onClick={() => handleApprove(order)} 
                                            className={
                                                order[7] === "yes" ? "px-4 py-2  text-white rounded bg-green-700 mr-2" : 
                                                order[7] === "no" ? "px-4 py-2  text-white rounded bg-green-700 mr-2" : 
                                                order[7] === "new" ? "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mr-2" : 
                                                order[7] 
                                            }
                                            disabled={
                                                order[7] === "new" ? false : 
                                                order[7] === "yes" ? true : 
                                                order[7] === "no" ? true : 
                                                order[7]
                                            }
                                        >
                                            Одобрить
                                        </button>
                                        <button 
                                            onClick={() => handleDecline(order)}
                                            className={
                                                order[7] === "yes" ? "px-4 py-2  text-white rounded bg-red-700 mr-2" : 
                                                order[7] === "no" ? "px-4 py-2  text-white rounded bg-red-700 mr-2" : 
                                                order[7] === "new" ? "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2" : 
                                                order[7] 
                                            }disabled={
                                                order[7] === "new" ? false : 
                                                order[7] === "yes" ? true : 
                                                order[7] === "no" ? true : 
                                                order[7]
                                            }
                                        >
                                            Отклонить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Модал для одобрения */}
                {showApproveModal && (
                    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setShowDeclineModal(false);
                            }
                        }}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold">Заполните данные справки для заказа ID: {selectedOrder[0]}</h2>
                            <textarea 
                                className="border p-2 w-full mt-2"
                                placeholder="Данные справки" 
                                value={referenceData} 
                                onChange={(e) => setReferenceData(e.target.value)} 
                            />
                            <div className="flex justify-between mt-4">
                                <button onClick={submitApproval} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Подтвердить</button>
                                <button onClick={() => setShowApproveModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Закрыть</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Модал для отклонения */}
                {showDeclineModal && (
                    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setShowDeclineModal(false);
                            }
                        }}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold">Введите причину отклонения для заказа ID: {selectedOrder[0]}</h2>
                            <textarea 
                                className="border p-2 w-full mt-2" 
                                placeholder="Причина отклонения" 
                                value={declineReason} 
                                onChange={(e) => setDeclineReason(e.target.value)} 
                            />
                            <div className="flex justify-between mt-4">
                                <button onClick={submitDecline} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Подтвердить</button>
                                <button onClick={() => setShowDeclineModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Закрыть</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </TeacherRoute>
    );
}

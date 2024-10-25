"use client"
import React, { useState } from 'react';
import Header from "../../components/Header"; 
import { ProtectedRoute } from "../../components/ProtectedRoute"; 
import Cookies from "js-cookie";
import { create } from "../../lib/orders"; 

export default function CreateOrder() {
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('');
  const [course, setCourse] = useState('');
  const [phone, setPhone] = useState('');
  const [medicalData, setMedicalData] = useState('');
  const [description, setdescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const email = Cookies.get("email");
        
        const response = await create(email, fullName, institution, course, phone, medicalData, description);
        
        setMessage(response.data.message);
        alert('Заявка отправлена!');
        resetForm();
        
    } catch (error) {
        setMessage(error.response?.data.detail || 'Не удалось создать заявку');
    }
  };

  const resetForm = () => {
    setFullName('');
    setInstitution('');
    setCourse('');
    setPhone('');
    setMedicalData('');
    setdescription('');
    setMessage('');
  };


  return (
    <ProtectedRoute>
      <div className="className=min-h-screen flex flex-col bg-gray-100 mt-5">
        <Header/>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">Форма подачи заявки</h1>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <div className="mb-4">
              <label className="block text-gray-700">ФИО</label>
              <input 
                type="text" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Учебное заведение</label>
              <input 
                type="text" 
                value={institution} 
                onChange={(e) => setInstitution(e.target.value)} 
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Курс</label>
              <input 
                type="text" 
                value={course} 
                onChange={(e) => setCourse(e.target.value)} 
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Телефон</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Данные медицинской карты</label>
              <textarea 
                value={medicalData} 
                onChange={(e) => setMedicalData(e.target.value)} 
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Описание</label>
              <textarea 
                value={description} 
                onChange={(e) => setdescription(e.target.value)} 
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 items-center justify-center">
              Отправить заявку
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

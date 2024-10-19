"use client"
import React, { useState } from 'react';
import Header from "../../components/Header"; 


export default function Form() {
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [medicalData, setMedicalData] = useState('');
  const [status, setStatus] = useState('Ожидает проверки');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Заявка отправлена!');
  };


  return (
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
            <label className="block text-gray-700">Электронная почта</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
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
            <label className="block text-gray-700">Статус заявки</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="Ожидает проверки">Ожидает проверки</option>
              <option value="Одобрена">Одобрена</option>
              <option value="Отклонена">Отклонена</option>
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 items-center justify-center">
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
};

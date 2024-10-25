"use client";
import React, { useState, useEffect } from 'react';
import { getAll, create } from "../../lib/auth"; 
import Header from "../../components/Header"; 

export default function Reg() {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
      login: '',
      name: '',
      lastName: ''
  });
  const [message, setMessage] = useState('');

  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

  const fetchUsers = async () => {
      try {
          const response = await getAll();
          return response.data;
      } catch (error) {
          setMessage(error + 'Ошибка при загрузке пользователей');
          return null;
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await create(formData)
          setMessage(response.data.message);
          
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                setCookie(key, formData[key], 7); 
            }
        }
          fetchUsers();
      } catch (error) {
          setMessage(error.response?.data.detail || error + 'Не удалось создать пользователя');
          return null;
      }
  };

//   const deleteUser = async (email, password) => {
//       try {
//           await axios.delete('http://127.0.0.1:8000/users/', {
//               data: { email, password },
//               headers: {
//                 'Content-Type': 'application/json'
//             }
//           });
//           fetchUsers();
//           setMessage('Пользователь успешно удалён');
//       } catch (error) {
//           setMessage(error.response?.data.detail || 'Не удалось удалить пользователя');
//       }
//   };

  useEffect(() => {
      fetchUsers();
  }, []);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 mt-5">
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Форма подачи заявки</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Электронная почта</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleChange} 
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Пароль</label>
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password} 
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Логин</label>
                    <input 
                        type="text" 
                        name="login"
                        value={formData.login} 
                        onChange={handleChange} 
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Имя</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name} 
                        onChange={handleChange} 
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Фамилия</label>
                    <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName} 
                        onChange={handleChange} 
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Зарегистрироваться
                </button>
                <a href='/reg' className="text-blue-700 flex flex-col items-center justify-center hover:text-blue-600">Войти в аккаунт</a>
            </form>
            {message && <div className={message !== "Пользователь успешно создан" ? "mt-4 text-red-500" : "mt-4 text-green-500"}>{message}</div>}
        </div>
    </div>
);
}

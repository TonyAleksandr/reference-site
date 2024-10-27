"use client";
import React, { useState, useEffect } from 'react';
import Header from "../../components/Header"; 
import { getAll } from "../../lib/auth"; 
import { useRouter } from "next/navigation";
import { createLog, createAuth, createClick } from "../../lib/logs"; 

export default function Reg() {
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

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
          return [];
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const users = await fetchUsers()
      const isMatchFound = users.some(item => item[1] === formData.email && item[2] === formData.password);
      
      if (!isMatchFound) {
        setMessage("Не верная почта или пароль!");
        return null; 
      }

      setCookie("email", formData.email);
      setCookie("password", formData.password);
      setMessage("Вы успешно авторизованны!");
      await createLog(formData.email, `Вход в аккаунт`)
      await createAuth(formData.email);
      await createClick(formData.email, "Войти");
      router.push('/');
      
  };

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
            <h1 className="text-3xl font-bold mb-4">Форма авторизации</h1>
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
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Войти
                </button>
                <a href='/reg' className="text-blue-700 flex flex-col items-center justify-center hover:text-blue-600">Зарегистрироваться</a>
            </form>
            {message && <div className={message !== "Вы успешно авторизованны!" ? "mt-4 text-red-500" : "mt-4 text-green-500"}>{message}</div>}
        </div>
    </div>
);
}

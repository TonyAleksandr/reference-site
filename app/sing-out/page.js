"use client";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const SingOut = () => {
  const router = useRouter();

  useEffect(() => {
    Cookies.remove("email");
    Cookies.remove("password");

    router.push('/');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700">Выход из системы...</h1>
    </div>
  );
};

export default SingOut;

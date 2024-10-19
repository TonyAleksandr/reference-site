"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useClerk  } from '@clerk/nextjs'

export default function Header() {
    const router = useRouter();
    const { signOut, openSignIn } = useClerk()
    const { user, isLoaded, isSignedIn } = useUser()
    console.log(useUser())
    
    return (
        <header className="bg-blue-500 text-white py-2 fixed top-0 left-0 w-full z-10">
            <div className="flex justify-between px-4">
                <div>
                    <button onClick={() => router.push('/')} className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg">Главная</button>
                    <button onClick={() => router.push('/orders')} className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg">Заказы</button>
                    <button onClick={() => router.push('/form')} className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg">Оформить заявку</button>
                </div>
                <div>
                    {isLoaded && isSignedIn ? ( 
                        <>
                            <span className="mx-2">Привет, {user.firstName}!</span>
                            <button onClick={() => signOut({ redirectUrl: '/' })} className="px-2 py-1 mx-2 hover:bg-blue-600 rounded-lg">Выйти</button>
                        </>
                    ) : (
                        <button onClick={() => openSignIn({ redirectUrl: '/' })} className="px-2 py-1 mx-2 rounded-lg">Войти</button>
                    )}
                </div>
            </div>
        </header>
    );
}

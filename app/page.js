import Image from "next/image";
import Header from "../components/Header"

export default function Home() {
  return (
    <>
      <Header/>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Добро пожаловать</h1>
        <p className="mb-8">Здесь вы можете подать заявки на получение справок.</p>
        <a href="/form" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Перейти к формe заявки
        </a>
      </div>
    </>
  );
}


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100  animate__animated animate__fadeIn">
        <h1 className="text-2xl font-bold text-gray-700">404 - Страница не найдена</h1>
        <a href="/" className="text-gray-600 hover:underline">На главную</a>
    </div>
  );
}

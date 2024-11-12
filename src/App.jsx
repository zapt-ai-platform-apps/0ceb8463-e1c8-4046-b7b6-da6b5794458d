import { useNavigate } from '@solidjs/router';

function App() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/packages');
  };

  return (
    <div dir="rtl" class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <div class="flex flex-col items-center justify-center h-full">
        <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
          <h1 class="text-4xl font-bold mb-6 text-purple-600">خدمات إمكانية الوصول للمكفوفين</h1>
          <p class="text-lg text-gray-700 mb-8">
            يهدف هذا التطبيق إلى تقديم خدمات ودعم للأشخاص ذوي الإعاقة البصرية لتحسين إمكانية الوصول والتفاعل مع التكنولوجيا.
          </p>
          <button
            onClick={handleNavigate}
            class="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            خدمة بيع التطبيقات
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
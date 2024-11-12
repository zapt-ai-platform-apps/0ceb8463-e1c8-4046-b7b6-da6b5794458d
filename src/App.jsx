import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function App() {
  const navigate = useNavigate();

  const handleAIAppBuilder = () => {
    navigate('/ai-app-builder');
  };

  return (
    <div dir="rtl" class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <div class="flex items-center justify-center h-full">
        <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
          <h1 class="text-4xl font-bold mb-6 text-purple-600">خدمات إمكانية الوصول للمكفوفين</h1>
          <p class="text-lg text-gray-700 mb-8">
            يهدف هذا التطبيق إلى تقديم خدمات ودعم للأشخاص ذوي الإعاقة البصرية لتحسين إمكانية الوصول والتفاعل مع التكنولوجيا.
          </p>
          <button
            class="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={handleAIAppBuilder}
          >
            منشئ التطبيقات بالذكاء الاصطناعي
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
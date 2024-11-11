import { createSignal } from 'solid-js';

function App() {
  return (
    <div dir="rtl" class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <div class="flex items-center justify-center h-full">
        <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
          <h1 class="text-4xl font-bold mb-4 text-purple-600">خدمات Blind Accessibility</h1>
          <p class="text-lg text-gray-700">
            يهدف هذا التطبيق إلى تقديم خدمات ودعم للأشخاص ذوي الإعاقة البصرية لتحسين إمكانية الوصول والتفاعل مع التكنولوجيا.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
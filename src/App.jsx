import { createSignal, For, Show } from 'solid-js';

function App() {
  const [showPackages, setShowPackages] = createSignal(false);

  const packages = [
    {
      id: 1,
      name: 'الباقة المجانية',
      description: 'باقة مجانية محدودة وبها إعلانات وحقوق النشر',
    },
    {
      id: 2,
      name: 'الباقة المتوسطة',
      description: 'باقة مدفوعة بدون إعلانات ودعم فني محدود',
    },
    {
      id: 3,
      name: 'الباقة الممتازة',
      description: 'باقة مدفوعة مع جميع الميزات ودعم فني على مدار الساعة',
    },
  ];

  return (
    <div dir="rtl" class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <div class="flex flex-col items-center justify-center h-full">
        <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
          <h1 class="text-4xl font-bold mb-6 text-purple-600">خدمات إمكانية الوصول للمكفوفين</h1>
          <p class="text-lg text-gray-700 mb-8">
            يهدف هذا التطبيق إلى تقديم خدمات ودعم للأشخاص ذوي الإعاقة البصرية لتحسين إمكانية الوصول والتفاعل مع التكنولوجيا.
          </p>
          <button
            class="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={() => setShowPackages(!showPackages())}
          >
            خدمة بيع التطبيقات
          </button>
        </div>
        <Show when={showPackages()}>
          <div class="w-full max-w-md mt-8 p-8 bg-white rounded-xl shadow-lg">
            <h2 class="text-2xl font-bold mb-4 text-purple-600 text-center">الباقات المتاحة</h2>
            <For each={packages}>
              {(pkg) => (
                <div class="mb-4 p-4 border rounded-lg">
                  <h3 class="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p class="text-gray-700">{pkg.description}</p>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
    </div>
  );
}

export default App;
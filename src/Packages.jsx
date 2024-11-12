import { For } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function Packages() {
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div dir="rtl" class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <div class="flex flex-col items-center justify-center h-full">
        <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <button
            onClick={handleBack}
            class="mb-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            العودة
          </button>
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
      </div>
    </div>
  );
}

export default Packages;
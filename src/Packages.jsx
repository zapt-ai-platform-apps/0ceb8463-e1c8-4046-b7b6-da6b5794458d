import { For, createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { createEvent } from './supabaseClient';

function Packages() {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(false);
  const [formData, setFormData] = createSignal({ name: '', email: '', packageId: '' });
  const [showForm, setShowForm] = createSignal(false);
  const [confirmationMessage, setConfirmationMessage] = createSignal('');

  const packages = [
    {
      id: 1,
      name: 'الباقة المجانية',
      description: 'باقة مجانية محدودة وبها إعلانات وحقوق النشر',
      price: 'مجانية',
      features: ['إعلانات', 'حقوق النشر', 'ميزات محدودة'],
    },
    {
      id: 2,
      name: 'الباقة المتوسطة',
      description: 'باقة مدفوعة بدون إعلانات ودعم فني محدود',
      price: '$49',
      features: ['بدون إعلانات', 'دعم فني محدود', 'ميزات إضافية'],
    },
    {
      id: 3,
      name: 'الباقة الممتازة',
      description: 'باقة مدفوعة مع جميع الميزات ودعم فني على مدار الساعة',
      price: '$99',
      features: ['جميع الميزات', 'دعم فني 24/7', 'تحديثات مجانية'],
    },
  ];

  const handleBack = () => {
    navigate('/');
  };

  const handleOrder = (pkgId) => {
    setFormData({ ...formData(), packageId: pkgId });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prompt = `عميل جديد يطلب الباقة رقم ${formData().packageId}. التفاصيل:
      الاسم: ${formData().name}
      البريد الإلكتروني: ${formData().email}`;

      await createEvent('chatgpt_request', {
        prompt,
        response_type: 'text',
      });

      setConfirmationMessage('تم إرسال طلبك بنجاح! سنقوم بالتواصل معك قريبًا.');
      setShowForm(false);
      setFormData({ name: '', email: '', packageId: '' });
    } catch (error) {
      console.error('Error submitting order:', error);
      setConfirmationMessage('حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <div class="flex flex-col items-center justify-center h-full">
        <div class="w-full max-w-4xl p-8 bg-white rounded-xl shadow-lg">
          <div class="flex justify-between items-center mb-6">
            <button
              onClick={handleBack}
              class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              العودة
            </button>
            <h2 class="text-3xl font-bold text-purple-600 text-center">الباقات المتاحة</h2>
          </div>
          <Show when={confirmationMessage()}>
            <div class="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
              {confirmationMessage()}
            </div>
          </Show>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <For each={packages}>
              {(pkg) => (
                <div class="p-6 border rounded-lg hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                  <h3 class="text-2xl font-bold mb-2 text-purple-600">{pkg.name}</h3>
                  <p class="text-xl font-semibold text-gray-800 mb-4">{pkg.price}</p>
                  <ul class="mb-4 text-gray-700 list-disc list-inside">
                    <For each={pkg.features}>
                      {(feature) => <li>{feature}</li>}
                    </For>
                  </ul>
                  <button
                    onClick={() => handleOrder(pkg.id)}
                    class="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                  >
                    اطلب الآن
                  </button>
                </div>
              )}
            </For>
          </div>
          <Show when={showForm()}>
            <div class="mt-8 p-6 bg-gray-100 rounded-lg">
              <h3 class="text-xl font-bold mb-4">نموذج الطلب</h3>
              <form onSubmit={handleSubmit} class="space-y-4">
                <input
                  type="text"
                  placeholder="الاسم"
                  value={formData().name}
                  onInput={(e) => setFormData({ ...formData(), name: e.target.value })}
                  class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={formData().email}
                  onInput={(e) => setFormData({ ...formData(), email: e.target.value })}
                  class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  class={`w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                    loading() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loading()}
                >
                  {loading() ? 'جاري الإرسال...' : 'إرسال'}
                </button>
              </form>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}

export default Packages;
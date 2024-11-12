import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { useNavigate } from '@solidjs/router';

function AIAppBuilder() {
  const [appName, setAppName] = createSignal('');
  const [appDescription, setAppDescription] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [generatedAppLink, setGeneratedAppLink] = createSignal('');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleAppCreation = async () => {
    if (!appName() || !appDescription()) return;
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `قم بإنشاء تطبيق يسمى "${appName()}" بوصف "${appDescription()}". يرجى توفير رابط للتطبيق الذي تم إنشاؤه. قدم الرد بصيغة JSON بالهيكل التالي: { "appLink": "رابط التطبيق" }`,
        response_type: 'json'
      });
      setGeneratedAppLink(result.appLink);
    } catch (error) {
      console.error('Error creating app:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 text-gray-800">
      <div class="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-purple-600 text-center">منشئ التطبيقات بالذكاء الاصطناعي</h2>
        <div class="space-y-4">
          <input
            type="text"
            placeholder="اسم التطبيق"
            value={appName()}
            onInput={(e) => setAppName(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-gray-800"
          />
          <textarea
            placeholder="وصف التطبيق"
            value={appDescription()}
            onInput={(e) => setAppDescription(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-gray-800"
            rows="4"
          ></textarea>
          <button
            onClick={handleAppCreation}
            class={`w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading()}
          >
            {loading() ? 'جارٍ إنشاء التطبيق...' : 'إنشاء التطبيق'}
          </button>
          {generatedAppLink() && (
            <div class="mt-6 bg-green-100 p-4 rounded-lg">
              <p class="text-green-800">تم إنشاء التطبيق بنجاح!</p>
              <a
                href={generatedAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline"
              >
                اضغط هنا لزيارة التطبيق
              </a>
            </div>
          )}
          <button
            onClick={handleBack}
            class="w-full mt-4 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            العودة
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAppBuilder;
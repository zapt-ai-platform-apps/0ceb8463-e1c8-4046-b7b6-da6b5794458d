import { useNavigate } from '@solidjs/router';
import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');

  const handleNavigate = () => {
    navigate('/packages');
  };

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  return (
    <div dir="rtl" class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="flex items-center justify-center h-full">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
              <h2 class="text-3xl font-bold mb-6 text-purple-600">تسجيل الدخول باستخدام ZAPT</h2>
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mb-6 block"
              >
                تعرف أكثر على ZAPT
              </a>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'facebook', 'apple']}
                magicLink={true}
                view="magic_link"
                showLinks={false}
                localization={{ variables: { sign_in: { email_label: 'البريد الإلكتروني' } } }}
              />
            </div>
          </div>
        }
      >
        <div class="flex flex-col items-center justify-center h-full">
          <div class="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg text-center">
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
            <button
              onClick={handleSignOut}
              class="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App;
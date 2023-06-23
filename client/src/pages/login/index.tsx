import { FcGoogle } from 'react-icons/fc';
import { loginWithGoogle, logout } from '../../utils/login';

const Home = () => {
  const handleLogin = async () => {
    await loginWithGoogle();
  };

  const onLogout = async () => {
    if (confirm('Logout?')) await logout();
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col gap-6 bg-slate-900">
      <button className="flex rounded-lg p-4 bg-black " onClick={handleLogin}>
        <FcGoogle className="text-4xl " />
        <span className="pl-3 text-white text-2xl">Login with Google</span>
      </button>
      <button className="flex rounded-lg p-4 bg-black " onClick={onLogout}>
        <span className="pl-3 text-white text-2xl">Logout</span>
      </button>
    </div>
  );
};

export default Home;

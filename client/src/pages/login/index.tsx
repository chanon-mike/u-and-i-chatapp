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
    <div className="flex justify-center items-center h-screen w-screen flex-col gap-6 bg-light-shade">
      <button className="flex rounded-lg p-4 bg-slate-800" onClick={handleLogin}>
        <FcGoogle className="text-4xl" />
        <span className="pl-3 text-white text-2xl">Login with Google</span>
      </button>
      <button className="flex rounded-lg p-4 bg-slate-800" onClick={onLogout}>
        <span className="text-white text-2xl">Logout</span>
      </button>
    </div>
  );
};

export default Home;

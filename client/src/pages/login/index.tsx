import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { loginWithGoogle } from '../../utils/login';

const Home = () => {
  const handleLogin = async () => {
    await loginWithGoogle();
  };

  const fetchData = async () => {
    const token = sessionStorage.getItem('accessToken');
    const response = await axios.get('http://localhost:8000/test', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col gap-6 bg-slate-900">
      <button className="flex rounded-lg p-4 bg-black " onClick={handleLogin}>
        <FcGoogle className="text-4xl " />
        <span className="pl-3 text-white text-2xl">Login with Google</span>
      </button>
      <button className="flex rounded-lg p-4 bg-black " onClick={fetchData}>
        <span className="pl-3 text-white text-2xl">Test login</span>
      </button>
    </div>
  );
};

export default Home;

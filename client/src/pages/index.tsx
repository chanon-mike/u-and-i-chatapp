import { useAtom } from 'jotai';
import { userAtom } from '../atom/user';
import { BasicHeader } from '../components/common/BasicHeader/BasicHeader';
import { Loading } from '../components/common/Loading/Loading';

const Home = () => {
  const [user] = useAtom(userAtom);

  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className="bg-slate-900 h-screen w-screen flex flex-col items-center justify-center">
        Index
      </div>
    </>
  );
};

export default Home;

import { useAtom } from 'jotai';
import { userAtom } from '../atom/user';
import { BasicHeader } from '../components/Header/Header';
import { Loading } from '../components/Loading/Loading';

const Home = () => {
  const [user] = useAtom(userAtom);

  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div>index</div>
    </>
  );
};

export default Home;

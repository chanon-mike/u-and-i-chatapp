import { useAtom } from 'jotai';
import { userAtom } from '../atom/user';

import ChatPage from '../components/Chat/ChatPage';
import ChatList from '../components/ChatList/ChatList';
import { Loading } from '../components/common/Loading/Loading';

const Home = () => {
  const [user] = useAtom(userAtom);

  if (!user) return <Loading visible />;

  return (
    <>
      {/* <BasicHeader user={user} /> */}
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        <ChatPage />
      </div>
    </>
  );
};

export default Home;

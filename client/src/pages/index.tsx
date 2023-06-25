import { useAtom } from 'jotai';
import { userAtom } from '../atom/user';

import Chat from '../components/Chat/Chat';
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
        <Chat />
      </div>
    </>
  );
};

export default Home;

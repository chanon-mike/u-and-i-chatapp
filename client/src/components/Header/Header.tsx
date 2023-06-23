import type { User } from 'firebase/auth';
import Link from 'next/link';
import { logout } from '../../utils/login';

export const BasicHeader = ({ user }: { user: User }) => {
  const onLogout = async () => {
    if (confirm('Logout?')) await logout();
  };

  return (
    <div className="h-10 bg-slate-200 border-b-2 border-white">
      <div className="w max-w-5xl h-full m-auto p-5 flex items-center justify-between">
        <Link href={'/'}>
          {/* <Image src={staticPath.othello_header_png} height={40} width={160} alt="othello logo" /> */}
          U&I ChatApp
        </Link>

        {/* <div className={styles.userBtn} onClick={onLogout}>
          {user.picture ? (
            <img
              className={styles.userIcon}
              src={user.photoURL}
              height={24}
              alt={user.displayName}
            />
          ) : (
            <HumanIcon size={18} fill="#555" />
          )} */}
        <span className="font-bold text-gray-400 text-base cursor-pointer" onClick={onLogout}>
          {user.displayName}
        </span>
      </div>
    </div>
  );
};

import type { User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { logout } from '../../../utils/login';

export const BasicHeader = ({ user }: { user: User }) => {
  const onLogout = async () => {
    if (confirm('Logout?')) await logout();
  };

  return (
    <div className="bg-columbia-blue h-16">
      <div className="h-full m-auto p-5 flex items-center justify-between">
        <Link className="flex items-center justify-between text-glaucous-blue font-bold" href="/">
          <Image src="/uandi_no_text.png" height={80} width={80} alt="othello logo" />
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
        <span className="font-bold text-glaucous-blue text-base cursor-pointer" onClick={onLogout}>
          {user.displayName}
        </span>
      </div>
    </div>
  );
};

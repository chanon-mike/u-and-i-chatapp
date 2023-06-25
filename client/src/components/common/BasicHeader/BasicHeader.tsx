import Image from 'next/image';
import Link from 'next/link';
import type { UserModel } from '../../../interfaces';
import { logout } from '../../../utils/login';

type BasicHeaderProps = {
  user: UserModel;
};

const BasicHeader = ({ user }: BasicHeaderProps) => {
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

        <div
          className="flex justify-center items-center gap-3 py-2 px-4 cursor-pointer"
          onClick={onLogout}
        >
          <Image
            className="rounded-full"
            src={user.avatar}
            height={24}
            width={24}
            alt={user.displayName}
          />
          <span className="font-bold text-glaucous-blue text-base cursor-pointer">
            {user.displayName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BasicHeader;

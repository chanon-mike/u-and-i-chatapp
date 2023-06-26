import type { UserModel } from '../../interfaces';
import Avatar from '../common/Avatar';

type ContactProps = {
  contact: UserModel;
};

const Contact = ({ contact }: ContactProps) => {
  return (
    <div className="flex items-center cursor-pointer hover:bg-searchbar-bg">
      <div className="min-w-fit px-5 py-2 flex items-center">
        <Avatar type="sm" image={contact.avatar} />
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
        <span className="text-primary">{contact.displayName}</span>
        <div className="pb-2 pt-1 w-full">
          <span className="text-secondary line-clamp-1 text-sm">Latest chat</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;

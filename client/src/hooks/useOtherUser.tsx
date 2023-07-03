import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { userAtom } from '../atom/user';
import type { FullConversationModel } from '../interfaces';

// Get the user other than current user in conversation
const useOtherUser = (conversation: FullConversationModel) => {
  const [user] = useAtom(userAtom);

  const otherUser = useMemo(() => {
    if (user) {
      const otherUser = conversation.members.filter((member) => member.userId !== user.uid);
      return otherUser[0];
    }
  }, [conversation.members, user]);

  return otherUser;
};

export default useOtherUser;

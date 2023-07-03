import { atom } from 'jotai';
import type { FullConversationModel } from '../interfaces';

export const conversationAtom = atom<FullConversationModel | null>(null);

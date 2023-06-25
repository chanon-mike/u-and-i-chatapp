import type { User } from 'firebase/auth';
import { atom } from 'jotai';
import type { UserModel } from '../interfaces';

export const fbUserAtom = atom<User | null>(null);
export const userAtom = atom<UserModel | null>(null);

import { atom } from "recoil";

export const isSwipeEnabled = atom({
  key: "isSwipeEnabled",
  default: true,
});

interface User {
  Id: string;
  Email: string;
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const authState = atom({
  key: "authState",
  default: false,
});

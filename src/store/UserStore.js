import { create } from "zustand";
const useUserStore = create((set) => ({
  auth: localStorage.getItem("token")? true: false,
  user: {},
  userSelected: {}, 
  userList: [],
  setAuth: (auth) => set({ auth: auth }),
  setUser: (user) => set({ user: user }),
  setUserSelected: (userSelected) => set({ userSelected: userSelected }),
  setUserList: (userList) => set({ userList: userList }),
}));

export default useUserStore;  
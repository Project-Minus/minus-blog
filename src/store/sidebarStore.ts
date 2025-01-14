import { create } from "zustand";

interface SidebarStore {
  category: string;
  setCategory: (selectedCategory: string) => void;
  search: string;
  setSearch: (searchText: string) => void;
}
export const useSidebarStore = create<SidebarStore>((set) => ({
  category: "",
  setCategory: (selectedCategory: string) =>
    set({ category: selectedCategory }),
  search: "",
  setSearch: (searchText: string) => set({ search: searchText }),
}));

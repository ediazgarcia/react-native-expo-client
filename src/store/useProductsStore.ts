import { create } from 'zustand';
import { getProducts, Product } from '../api/products';

type State = {
  products: Product[];
  loading: boolean;
  error?: string;
  fetchProducts: () => Promise<void>;
  clearError: () => void;
};

export const useProductsStore = create<State>((set) => ({
  products: [],
  loading: false,
  error: undefined,
  
  fetchProducts: async () => {
    set({ loading: true, error: undefined });
    try {
      const data = await getProducts();
      set({ products: data, loading: false });
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Error al cargar los productos';
      set({ error: errorMessage, loading: false });
    }
  },
  
  clearError: () => set({ error: undefined }),
}));

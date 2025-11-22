import axios from 'axios';

// Default base URL. For Android emulator use 10.0.2.2, for iOS Simulator use localhost.
const DEFAULT_BASE = process.env.API_BASE_URL || 'http://10.0.2.2:5163';

const api = axios.create({
  baseURL: DEFAULT_BASE,
  timeout: 5000,
});

export type Product = {
  id: string; // GUID from the API
  name: string;
  price: number;
};

export async function getProducts(): Promise<Product[]> {
  const res = await api.get<Product[]>('/products');
  return res.data;
}

export async function getProduct(id: string): Promise<Product> {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
}

export async function createProduct(payload: { name: string; price: number }) {
  const res = await api.post('/products', payload);
  return res.data;
}

export async function updateProduct(id: string, payload: { id: string; name: string; price: number }) {
  await api.put(`/products/${id}`, payload);
}

export async function deleteProduct(id: string) {
  await api.delete(`/products/${id}`);
}

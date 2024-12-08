// Add interface for Product
export interface Product {
  id: number;
  name: string;
  price: number;
  // Add other product properties as needed
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('http://localhost:3000/api/sale_items');

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = (await response.json()) as Product[];
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch products');
  }
}

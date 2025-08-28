
export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  asin: string; // Amazon Standard Identification Number
  category: string;
}

export interface DateNightIdea {
  title: string;
  description: string;
  suggested_products: string[];
}

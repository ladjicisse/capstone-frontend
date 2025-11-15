export type ProductModel = {
  id: number,
  name: string,
  price: number,
  type: ProductType,
  description: string,
  image: string
};

export type ProductType = "Detox" | "Hydration" | "Vitamins";

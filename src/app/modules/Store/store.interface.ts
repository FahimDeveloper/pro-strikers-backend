export interface IStore {
  product_name: string;
  category: string;
  price: number;
  color: string;
  size: string;
  images: string[];
  description: string;
  price_variation: boolean;
  price_variations: IPriceVariation[];
  non_price_variation: boolean;
  non_price_variations: INonPriceVariation;
}

export interface IPriceVariation {
  variation_type: string;
  variation_value: string;
  variation_price: number;
}

export interface INonPriceVariation {
  variation_type: string;
  variation_value: Array<string>;
}

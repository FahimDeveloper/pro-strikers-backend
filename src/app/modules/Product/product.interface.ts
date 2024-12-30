export interface IVariation {
  color?: {
    name: string;
    color_code: string;
  };
  size?: string;
  price?: number;
  stock?: number;
}

export interface IProduct {
  name: string;
  short_description: string;
  details: string;
  thumbnail: string;
  gallery: Array<string>;
  regular_price: number;
  offer_price: number;
  rating: number;
  price: number;
  color: {
    name: string;
    color_code: string;
  };
  size: string;
  stock: number;
  category:
    | 'bats'
    | 'gloves'
    | 'soccer items'
    | 'wearables'
    | 'helmets'
    | 'sports bags';
  brand: string;
  variations?: IVariation[];
}

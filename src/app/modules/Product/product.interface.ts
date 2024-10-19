export interface IVariation {
  color?: string;
  size?: string;
  price?: number;
  stock: number;
}

export interface IProduct {
  name: string;
  short_description: string;
  details: string;
  thumbnail: string;
  gallery: string[];
  category:
    | 'bats'
    | 'gloves'
    | 'soccer items'
    | 'wearables'
    | 'helmets'
    | 'sports bags';
  brand: string;
  variations: IVariation[];
}

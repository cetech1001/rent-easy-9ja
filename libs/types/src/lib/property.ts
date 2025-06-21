export interface Property {
  id: number;
  uri: string;
  title: string;
  subtitle: string;
  price: string;
  location: string;
}

export interface Amenities {
  furnished?: boolean;
  ac?: boolean;
  security?: boolean;
  parking?: boolean;
}

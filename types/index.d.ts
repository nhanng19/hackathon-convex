import { StaticImageData } from 'next/image';
import { SetStateAction } from 'react';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Category = {
  alias: string;
  title: string;
};

type Location = {
  address1: string;
  address2: string | null;
  address3: string;
  city: string;
  country: string;
  display_address: string[];
  state: string;
  zip_code: string;
};

export type YelpBusiness = {
  alias: string;
  categories: Category[];
  coordinates: Coordinates;
  display_phone: string;
  distance: number;
  id: string;
  image_url: string;
  is_closed: boolean;
  location: Location;
  name: string;
  phone: string;
  price: string;
  rating: number;
  review_count: number;
  transactions: string[];
  url: string;
};


export type CardProps = {
  data: YelpBusiness;
  active: boolean;
  removeCard: (id: number, action: 'right' | 'left') => void;
};

export type SwipeButtonProps = {
  exit: (value: SetStateAction<number>) => void;
  removeCard: (id: number, action: 'right' | 'left') => void;
  id: number;
};
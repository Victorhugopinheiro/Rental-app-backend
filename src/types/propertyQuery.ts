import { PropertyType, Amenity } from "@prisma/client";

export interface GetPropertiesQuery {
  favoriteIds?: string | undefined;
  priceMin?: string | undefined;
  priceMax?: string | undefined;
  bedrooms?: string | undefined;
  bathrooms?: string | undefined;
  availableFrom?: string | undefined;
  squareFeetMin?: string | undefined;
  squareFeetMax?: string | undefined;
  propertyType?: PropertyType | undefined;
  amenities?: string | string[] | undefined;
  longitude?: string | undefined;
  latitude?: string | undefined;
}

export interface GetPropertiesFilters {
  favoriteIds?: number[];
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
  squareFeetMin?: number;
  squareFeetMax?: number;
  propertyType?: PropertyType;
  amenities?: Amenity[];
  longitude?: number;
  latitude?: number;
}

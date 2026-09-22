export interface CityProps {
  id: number;
  name: string;
  region: {
    id: number;
    name: string;
  } | null;
}

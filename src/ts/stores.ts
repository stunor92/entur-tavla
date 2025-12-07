import { createContext } from 'react';

interface LocationContextType {
  locationName: string;
  setLocationName: (name: string) => void;
}

export const LocationContext = createContext<LocationContextType>({
  locationName: 'Vormedal',
  setLocationName: () => {}
});

import { createContext } from 'react';

// Define types via JSDoc instead of TypeScript.
// /**
//  * @typedef {Object} LocationContextType
//  * @property {string} locationName
//  * @property {(name: string) => void} setLocationName
//  */

export const LocationContext = createContext({
  locationName: 'Vormedal',
  setLocationName: () => {}
});
// Optionally annotate the context for editors:
// /** @type {import('react').Context<LocationContextType>} */
// export const LocationContext = createContext({ ...same default... });

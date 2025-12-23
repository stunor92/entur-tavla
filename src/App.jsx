import { useState, useEffect, useMemo } from 'react';
import Weather from './components/Weather.jsx';
import { LocationContext } from './ts/stores.js';
import './css/main.css';

export default function App() {
  const [location, setLocation] = useState({
    name: 'Bergen',
    lat: 60.39299,
    lng: 5.32415
  });
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function _fetch(url) {
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });

    return result;
  }

  async function getYr(lat, lng) {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`;
    const result = await _fetch(url);
    return result;
  }

  // Geolocation functions - commented out as they are not currently used
  // Can be uncommented if location detection is needed in the future

  // async function _getNameFromCoordinates(lat: number, lon: number): Promise<NominatimReverse> {
  //   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  //   const result: Promise<NominatimReverse> = await _fetch(url);
  //   return result;
  // }

  // async function getNameFromCoordinates(lat: number, lon: number) {
  //   const result = await _getNameFromCoordinates(lat, lon);

  //   if (result.address.city) {
  //     return result.address.city;
  //   } else if (result.address.village) {
  //     return result.address.village;
  //   }

  //   return 'Ukjent';
  // }

  // Function to get location (can be called manually if needed)
  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(async (position) => {
  //       const newLocation = {
  //         name: await getNameFromCoordinates(position.coords.latitude, position.coords.longitude),
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };
  //       setLocation(newLocation);
  //     });
  //     console.log('Retrieved location', location);
  //   } else {
  //     alert('Could not retrieve location');
  //   }
  // }

  useEffect(() => {
    // Fetch weather data
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const data = await getYr(String(location.lat), String(location.lng));
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  useEffect(() => {
    // Reload page every 15 minutes
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 900000);

    // Carousel interval (currently not used but kept for potential future use)
    // const carouselIntervalId = setInterval(() => {
    //   setCurrentIframeIndex((prevIndex) => (prevIndex + 1) % icons.length);
    // }, 20000);

    return () => {
      clearInterval(intervalId);
      // clearInterval(carouselIntervalId);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      locationName: location.name,
      setLocationName: (name) => setLocation({ ...location, name })
    }),
    [location]
  );

  return (
    <LocationContext.Provider value={contextValue}>
      <div className="centered-container" style={{ paddingTop: '5vh' }}>
        <img src="bergentur.png" alt="" width="50%" />
      </div>

      <div className="centered-container" style={{ height: '50vh' }}>
        <video src="entur.mp4" autoPlay loop muted controls className="video-blur"></video>
      </div>

      <div className="centered-container">
        {isLoading ? (
          <div className="w-full">laster inn...</div>
        ) : weatherData ? (
          <div className="centered-container">
            <Weather weather={weatherData.properties.timeseries[3]} />
            <Weather weather={weatherData.properties.timeseries[4]} />
            <Weather weather={weatherData.properties.timeseries[5]} />
            <Weather weather={weatherData.properties.timeseries[6]} />
            <Weather weather={weatherData.properties.timeseries[7]} />
            <Weather weather={weatherData.properties.timeseries[8]} />
          </div>
        ) : null}
      </div>

      <img src="entur.png" alt="" width="100%" />
    </LocationContext.Provider>
  );
}

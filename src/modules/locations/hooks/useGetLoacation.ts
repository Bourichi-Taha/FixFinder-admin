import { useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationError {
  message: string;
}

interface HookReturn {
  location: Location | null;
  error: LocationError | null;
  loading: boolean;
}

function useGetLocation(): HookReturn {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<LocationError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    function getLocation(): Promise<Location> {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
            },
            (error) => {
              reject({ message: error.message });
            }
          );
        } else {
          reject({ message: "Geolocation is not supported by this browser." });
        }
      });
    }

    getLocation()
      .then((coords) => {
        setLocation(coords);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { location, error, loading };
}

export default useGetLocation;

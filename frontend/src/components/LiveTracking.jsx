import { useRef, useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const LiveTracking = () => {
  const mapElement = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const apiKey = import.meta.env.VITE_TOM_MAPS;

  useEffect(() => {
    map.current = tt.map({
      key: apiKey,
      container: mapElement.current,
      center: [0, 0],
      zoom: 14
    });

    marker.current = new tt.Marker().setLngLat([0, 0]).addTo(map.current);

    // Update location function
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            marker.current.setLngLat([longitude, latitude]);
            map.current.setCenter([longitude, latitude]);
            console.log("Location updated:", latitude, longitude);
          },
          (error) => {
            console.error("Geolocation error:", error);
            const fallbackLatLng = [77.4126, 23.2599]; // Bhopal fallback
            marker.current.setLngLat(fallbackLatLng);
            map.current.setCenter(fallbackLatLng);
          },
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      }
    };

    // Initial location update
    updateLocation();

    // Set interval for updates every 10 seconds
    const locationInterval = setInterval(updateLocation, 15000);

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
      }
      clearInterval(locationInterval);
    };
  }, [apiKey]);

  return (
    <div
      ref={mapElement}
      className=" rounded-lg shadow-lg border-2 border-gray-300"
      style={{ height: "100vh", width: "100%" }}
    />
  );
};

export default LiveTracking;

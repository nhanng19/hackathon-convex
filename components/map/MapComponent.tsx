"use client";

import { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
interface Position {
  lat: any;
  lng: any;
}

interface MapProps {
  defaultCenter: Position;
  defaultZoom: number;
  currentPosition: any;
}

const MapComponent = (props: MapProps) => {
  const { defaultCenter, defaultZoom, currentPosition } = props;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const [directionsResponse, setDirectionsResponse] = useState<any>();
  useEffect(() => {
    const handleCalculateRoute = async () => {
      if (isLoaded && currentPosition) {
        const directionsService = new window.google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: defaultCenter,
          destination: currentPosition.location.display_address.join(" "),
          travelMode: window.google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
      }
    };
    handleCalculateRoute();
  }, [defaultCenter]);
  if (!isLoaded) return null;
  return (
    <div className="h-full w-full flex-1 relative">
      <GoogleMap
        center={defaultCenter}
        zoom={defaultZoom}
        mapContainerStyle={{ width: "100%", height: "100%", flex: "1" }}
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
        <Marker position={defaultCenter} />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;

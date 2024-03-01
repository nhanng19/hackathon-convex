import {useState, useEffect} from "react"

export default function useLocation(){ 
  const [location, setLocation] = useState<GeolocationCoordinates>();
  useEffect(() => { 
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(
       (position) => { 
         const positions = position.coords;
         setLocation(positions)
       }
    )
   } 
  }, [])
  return location
}
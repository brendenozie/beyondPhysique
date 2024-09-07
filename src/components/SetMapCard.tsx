import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, SetStateAction, useState } from "react";
import Map, { Marker } from "react-map-gl";

type Props = {
  marker: any;
  setMarker: Dispatch<SetStateAction<any>>;
};

const SetLocationCard = ({setMarker , marker}: Props) => {
  
   const [viewport, setViewport] = useState({
    width: "100%",
    height: "calc(100% - 68px)",
    latitude: 37.8,
    longitude: -122.4,
    zoom: 11,
  });

  function handleMapClick(e:any) {
       setMarker({lat:e.lngLat.lat,long:e.lngLat.lng});
  }


  return (
    <>
      <Map
        viewState={{
        longitude: viewport.longitude,
        latitude: viewport.latitude,
        zoom: viewport.zoom,
      }}
      width={viewport.width}
      height={viewport.height}
      mapStyle="mapbox://styles/javiergongora/clalbftnj000g15nsx3nbjynw"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: viewport.width, height: viewport.height }}
      onViewportChange={(nextViewport : any) => setViewport(nextViewport)}
      >
        {marker &&
                 <div key={marker.long}>
                    <Marker
                        latitude={marker.lat}
                        longitude={marker.long}
                        offsetLeft={-20}  // X offset
                        offsetTop={-10}   // Y offset
                      >
                        <p
                           role="img"
                           className="cursor-pointer text-2xl animate-bounce"
                           aria-label="push-pin"
                        >
                          📌
                        </p>
                    </Marker>
                              
                  {/* popup should show if we click on a marker */}
                                             
                  </div>
                 }
            </Map>
    </>
  );
};

export default SetLocationCard;

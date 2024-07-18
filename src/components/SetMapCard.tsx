import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, SetStateAction, useState } from "react";
import Map, { Marker } from "react-map-gl";

type Props = {
  marker: any;
  setMarker: Dispatch<SetStateAction<any>>;
};

const SetLocationCard = ({setMarker , marker}: Props) => {
  
  const [viewport, setViewport] = useState({
    style: {
      width: "100%",
      height: "calc(100% - 68px)",
    },
    initialViewState: {
      longitude: 36.821946,
      latitude: -1.292066,
      zoom:11,
    },
  });

  function handleMapClick(e:any) {
       setMarker({lat:e.lngLat.lat,long:e.lngLat.lng});
  }


  return (
    <>
      <Map
          {...viewport}
          mapStyle="mapbox://styles/javiergongora/clalbftnj000g15nsx3nbjynw"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          onClick={handleMapClick}
      >
        {marker &&
                 <div key={marker.long}>
                    <Marker
                         latitude={marker.lat}
                         longitude={marker.long}
                         offset={[12, -6]}
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

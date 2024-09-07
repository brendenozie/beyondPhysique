import { StarIcon } from "@heroicons/react/24/solid";
import { getCenter } from "geolib";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { IDestination, IHotel, IResult } from "../types/typings";

type Props = {
  searchResults: any;
  favorites?: Boolean;
};

const loaderProp =({ src  } :any) => {
  return src;
}

const MapCard = ({ searchResults, favorites=false }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<IDestination | null>(
    null
  );
  const coordinates = searchResults.results?.map((result : IDestination) => ({
    latitude: result.lat ,
    longitude: result.long ,
  }));
  const center: any = getCenter(coordinates);
  // const [viewport, setViewport] = useState({
  //   style: {
  //     width: "100%",
  //     height: "calc(100% - 68px)",
  //   },
  //   initialViewState: {
  //     longitude: center.longitude,
  //     latitude: center.latitude,
  //     zoom: favorites? 1: 11,
  //   },
  // });

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "calc(100% - 68px)",
    latitude: 37.8,
    longitude: -122.4,
    zoom: 11,
  });

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
        {searchResults.results.map((result : IDestination) => (
              <div key={result.long}>
                <Marker
              latitude={result.lat}
              longitude={result.long}
              offsetLeft={-20}  // X offset
              offsetTop={-10}   // Y offset
            >
                  <p  role="img" 
                      onPointerOver={() => { setSelectedLocation(result);  }}
                      className="cursor-pointer text-2xl animate-bounce"
                      aria-label="push-pin"
                  >
                    📌
                  </p>
                </Marker>

                {/* popup should show if we click on a marker */}
                {selectedLocation?.long === result.long ? (
                  <Popup
                    onClose={() => setSelectedLocation(null)}
                    closeOnClick={true}
                    latitude={result.lat}
                    longitude={result.long}
                  >
                    <div className="flex space-x-2">
                      <div className="relative h-[100px] w-[150px]">
                        <Image
                          className="object-cover"
                          src={result.img[0].url}
                          alt={result.title}
                          fill
                          loader={loaderProp}
                        />
                      </div>
                      <div className="h-[100px] w-[180px]">
                        <div>{result.title}</div>
                        <div className="flex justify-between items-end pt-5">
                          <p className="flex items-center">
                            <StarIcon className="h-5 text-red-400" /> {result.star}
                          </p>

                          <div>
                            <p className="text-xs lg:text-32xl font-semibold ">
                              {result.price}
                            </p>
                            <p className="text-right font-extralight">
                              {result.total}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popup>
                ) : (
                  false
                )}
              </div>
           ) 
           )
           }
      </Map>
    </>
  );
};

export default MapCard;

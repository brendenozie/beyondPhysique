import { HeartIcon } from "@heroicons/react/24/outline";
import {
  ChevronRightIcon,
  HeartIcon as HeartIconSolid,
  StarIcon,
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IDestination, IResult } from "../types/typings";

const loaderProp =({ src  } :any) => {
  return src;
}

type Props = {
  cityId?: string;
  item: IDestination;
  session: Session;
  favorite?: boolean;
  fromFavPage?: boolean;
  startDate?: string;
  endDate?: string;
  numOfGuests?: string;
  booking?: boolean;
};

const InfoCard = ({
  cityId,
  item,
  session,
  startDate,
  endDate,
  numOfGuests,
  favorite = false,
  fromFavPage = false,
  booking = false,
}: Props) => {
  const router = useRouter();
  const [isFav, setIsFav] = useState(false);
  const userEmail = session?.user?.email!;
  const hotelId = item.id;
  let startDateFormatted: string;
  let endDateFormatted: string;

  useEffect(() => {
    if (favorite) setIsFav(true);
    if (startDate && endDate) {
      startDateFormatted = format(new Date(startDate as string), "dd MMMM yy");
      endDateFormatted = format(new Date(endDate as string), "dd MMMM yy");
    } else {
      startDateFormatted = item.startDate as string;
      endDateFormatted = item.endDate as string;
    }
  }, []);

  const details = () => {
    router.push({
      pathname: "/details",
      query: {
        cityId: cityId,
        favorite: favorite as unknown as string,
        fromFavPage: fromFavPage as unknown as string,
        booking: booking as unknown as string,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
        numOfGuests: numOfGuests,
        hotelId: item.hotelId,
        img:JSON.stringify(item.img),
        location: item.location,
        title: item.title,
        description: item.description,
        star: item.star,
        price: item.price,
        total: item.total,
        long: item.long,
        lat: item.lat,
      },
    });
  };

  const submitFavorite = async () => {
    try {
      const body = { ...item, cityId };
      let url = process.env.NEXT_PUBLIC_API_URL;
      await fetch(url+"/post-favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavorite = async () => {
    try {
      const body = { itemId: item.id, userEmail: userEmail };
      let url = process.env.NEXT_PUBLIC_API_URL;
      await fetch(url+"/delete-favorite", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setIsFav(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateBooking = async () => {

    try {

      const body = { bookingId: item.id, status: "Cancelled" };

      let updateBookingStatus=`${process.env.NEXT_PUBLIC_API_URL}/get-bookings/${item.id}`;

      await fetch(updateBookingStatus, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
      {/* Main Image */}
      <div className="relative h-40 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          className="object-cover rounded-2xl"
          src={item.img && item.img[0].url}
          alt={item.title}
          fill
          loader={loaderProp}
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          {/* Hotel Location Info, distance from nearest city center */}
          <p className="">{item.location}</p>
          {/* Favorite Heart Icon */}
          {!booking &&
            (!isFav ? (
              <HeartIcon
                onClick={() => {
                  submitFavorite();
                  setIsFav(true);
                }}
                className="h-7 cursor-pointer"
              />
            ) : (
              <HeartIconSolid
                onClick={() => {
                  deleteFavorite();
                  setIsFav(false);
                }}
                className="h-7 cursor-pointer"
              />
            ))}
        </div>
        {/* Hotel Title, Description */}
        <h4 className="text-xl">{item.title}</h4>
        <div className="border-b w-10 pt-2" />
        <div className="pt-2 text-sm text-gray-800 flex-grow">
          <p>{item.description}</p>
          <div className="border-b w-10 pt-2" />
          {booking && (
            <p className="font-light">
              Reserved from {item.startDate} to {item.endDate}
            </p>
          )}
          <div className="border-b w-10 pt-2" />
          <p className="text-gray-900">Booking Status: {item.status}</p>
        </div>
        {/* Hotel Rating, Star Icon */}
        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" /> {item.star == 0? 5 : item.star}
          </p>
          {/* Price per Night */}
          <div>
            <p className="text-right text-lg lg:text-xl font-semibold">
              {`${item.offer==true? item.offerPrice  : item.price} / night`}
            </p>
            {/* Total Price */}
            {!fromFavPage && (
              <p className="text-right font-extralight">{`${item.offer==true? "On offer " : ""} `}</p>
            )}
            {/* More Details, go to Details Page */}
            <div className="justify-end flex items-baseline">
            <p
                onClick={updateBooking}
                className="text-right text-base pt-2 lg:text-l font-semibold cursor-pointer hover:text-orange-500 mr-2"
              >
                Cancel Booking
              </p>
              <p
                onClick={details}
                className="text-right text-base pt-2 lg:text-l font-semibold cursor-pointer hover:text-orange-500"
              >
                More details
              </p>
              <ChevronRightIcon className="h-2.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;

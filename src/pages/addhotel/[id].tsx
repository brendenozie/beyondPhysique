import { Key, useCallback, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SetLocationCard from "@/components/SetMapCard";
import Compressor from 'compressorjs';
import axios from "axios";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import {ICity, IHotel, ITravelStyle, uploadImage } from "@/types/typings";

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

type Props = {
    session: Session;    
    travelStyles: ITravelStyle[];
    cities: ICity[];
    detailsResult: IHotel;
};

const addHotel = ({ session,travelStyles,cities,detailsResult }: Props) => {

    const [files, setFile] = useState<any[]>([]);
    const [imageFiles, setImageFiles] = useState<any[]>([]);
    const [images, setImages] = useState<uploadImage[]>(detailsResult.img);
    const [isLoading, setIsLoading] = useState(false);

    //Message incase an error is encountered when selecting the images
    const [message, setMessage] = useState("");

    //Hotel Details
    const [title, setTitle] = useState(detailsResult.title);
    const [description, setDescription] = useState(detailsResult.description);
    const [star, setStar] = useState(0);
    const [location, setLocation] = useState(detailsResult.location);
    const [room, setRoom] = useState("0");
    const [price, setPrice] = useState(detailsResult.price);
    const [offer, setOffer] = useState(detailsResult.offer);
    const [offerPrice, setOfferPrice] = useState(detailsResult.offerPrice);
    const [userEmail, setUserEmail] = useState("");
    const [cityId, setCityId] = useState(detailsResult.cityId);    
    const [travelStyleId, setTravelStyleId] = useState(detailsResult.travelStyleId);
    const [marker, setMarker] = useState<{ lat: any, long: any }>({ lat: detailsResult.lat, long: detailsResult.long });

    const router = useRouter();

    useEffect(() => {

        const update: any[] = [...images];
        // const images = [],
        const fileReaders: any[] = [];
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {

                new Compressor(file, {
                    quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
                    success: (compressedResult) => {
                        // compressedResult has the compressed file.
                        // Use the compressed file to upload the images to your server.  
                        const fileReader = new FileReader();
                        fileReaders.push(fileReader);
                        fileReader.onload = (e: any) => {
                            const { result } = e.target;
                            if (result) {
                                update.push({publicId: "-1", url: result, status: 'local' });
                            }
                            if (update.length < 5) {
                                setImages(update);
                                setImageFiles([]);
                            }
                        }
                        fileReader.readAsDataURL(compressedResult);
                    },
                });

            })

        };
        return () => {
            isCancel = true;
            fileReaders.forEach(fileReader => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }
    }, [imageFiles]);

    const removeImage = (i: any) => {
        setFile(files.filter(x => x.name !== i));
    }

    const changeHandler = async (e: any) => {
        const { files } = e.target;
        const validImageFiles: any[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.match(imageTypeRegex)) {
                validImageFiles.push(file);
            }
        }
        if (validImageFiles.length && validImageFiles.length < 4 && images.length < 4) {
            setImageFiles(validImageFiles);
            return;
        }
        setMessage("Selected images are not of valid type\nOr\nImage Count is above allowed limit!");
    };

    const onCreateHotel = useCallback(async () => {

        if (!session) {
            return {
                redirect: {
                    destination: "/signin",
                    permanent: false,
                },
            };
        }

        setIsLoading(true);

        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

        let notUploadedImages = images.filter(itm => itm.status !== 'uploaded');

        if(notUploadedImages.length > 0) {
        let list = await Promise.all(            
                        notUploadedImages.map(async (imge) => {            
                            const { signature, timestamp } = await getSignature();
                            const formData = new FormData();
                            formData.append("file", imge.url);
                            formData.append("signature", signature);
                            formData.append("timestamp", timestamp);
                            formData.append("api_key", `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`);

                            const response = await fetch(url, {
                                method: "post",
                                body: formData,
                            });

                            const data = await response.json();

                            return [...images, {publicId: data.public_id, url: data.secure_url, status: "uploaded"}];
                        })
                    ).then((response) =>{
                        const filteredData = response[0].filter((cat: any) => cat.status === "uploaded");
                        return filteredData;
                    });

                    setImages(list);
                }

        var hotelDetails ={
                            id : detailsResult.id,
                            title : title,
                            description : description,
                            img : images,
                            lat : marker?.lat,
                            location : location,
                            long : marker?.long,
                            price : parseFloat(price),
                            offer : offer,
                            offerPrice : offerPrice ? parseFloat(offerPrice) : 0.00,
                            cityId : cityId,
                            travelStyleId : travelStyleId,
                        };
        let urll = `${process.env.NEXT_PUBLIC_API_URL}/get-hotels/${hotelDetails.id}`;

        await axios.put(urll, hotelDetails).then(() => {
                //   toast.success('Listing reserved!');
                //   setDateRange(initialDateRange);
                // router.push('/');
            }).catch(() => {
                //   toast.error('Something went wrong.');
                setIsLoading(false);
            }).finally(() => {
                router.push("/hotels");
            })
        },
        [
            title,
            description,
            images,
            marker,
            location,
            price,
            offer,
            offerPrice,
            cityId,
    ]);

    const onDeleteImage = async (publicId: string) => {

        if (!session) {
            return {
                redirect: {
                    destination: "/signin",
                    permanent: false,
                },
            };
        }
        let url = process.env.NEXT_PUBLIC_API_URL;

        await axios.delete(`${url}/destroy/${publicId}`).then(async () => {
            await axios.post(`${url}/delete-hotel-image`,{id:publicId}).then(() => {
                const img = images.filter(img => img.publicId !== publicId);
                setImages(img);
            }).catch((err) => {
                alert(`Something went wrong.${err.message}`);
                setIsLoading(false);
            });
        }).catch((err) => {
            alert('Something went wrong.');
                setIsLoading(false);
            });

    };


    return (
        <div>
            {/* No Placeholder htmlFor Hotels from Favorite List */}
            <Header />
            <div className=" h-[120px] sm:h-[120px] lg:h-[120px] xl-h-[120px] 2xl:h-[120px] bg-black"></div>
            <main className="flex flex-col max-w-4xl mx-auto">
                {/* Left Section */}
                <section className="flex-grow pt-14 px-6">

                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Hotel Details</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                                Title
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="title" type="text" value={title} placeholder="title" onChange={(e) => { setTitle(e.target.value) }} />

                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="description" value={description} type="text" placeholder="description" onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                Location Desctiption
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="description" value={location} type="text" placeholder="description" onChange={(e) => { setLocation(e.target.value) }} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="room">
                                Room Count
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="room" value={room} type="text" placeholder="Room Count" onChange={(e) => { setRoom(e.target.value) }} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price">
                                Price
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="price" value={price} type="text" placeholder="price" onChange={(e) => { setPrice(e.target.value) }} />
                        </div>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                        <fieldset>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input id="offers" checked={offer} name="offers" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onChange={(e) => { setOffer(e.target.checked) }} />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="offers" className="font-medium text-gray-900">Offers</label>
                                        <p className="text-gray-500">Select this option if the hotel is on/and has an offer.</p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="offerprice">
                                Offer Price
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="offerprice" value={offerPrice} type="text" placeholder="offer price" onChange={(e) => { setOfferPrice(e.target.value) }} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                City
                            </label>
                            <div className="relative">
                                <select defaultValue="Pick A City" value={cityId} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={(e) => setCityId(e.target.value )}>
                                <option value="Pick The City">Pick The City</option>
                                {cities.map((city) => (
                                        <option value={city.id} >{city.cityName}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Travel Style
                            </label>
                            <div className="relative">
                                <select defaultValue="Pick Travel Style" value={travelStyleId} onChange={(e) => setTravelStyleId(e.target.value )} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value="Pick Travel Style">Pick Your Travel Style</option>
                                    {travelStyles.map((travelStyle) => (
                                        <option value={travelStyle.id}>{travelStyle.styleName}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Location
                            </label>
                            <div className="relative">
                                <div className="w-full h-[500px]">
                                    <SetLocationCard marker={marker} setMarker={setMarker} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-64 flex flex-wrap justify-center items-center bg-gray-300 px-2">
                        <div className="p-3 md:w-1/2 w-[360px] bg-white rounded-md">
                            <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">{message}</span>
                            <div className="h-32 w-full relative border-2 items-center rounded-md cursor-pointer bg-gray-300 border-gray-400 border-dotted">
                                <input type="file" onChange={changeHandler} className="h-full w-full bg-green-200 opacity-0 z-10 absolute" multiple={true} name="files[]" />
                                <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
                                    <div className="flex flex-col">
                                        <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                                        <span className="text-[12px]">{`Drag and Drop a file`}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">

                            {images.map((file, key) => {
                                    return (
                                        <div key={key} className="overflow-hidden group relative h-20 w-20">
                                            <img className="w-full object-cover"
                                                src={file.url} />
                                            <div
                                                className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-gray-700 opacity-0 group-hover:h-full group-hover:opacity-70 duration-500">
                                                <h1 className="text-2xl text-white"></h1>
                                                <button className="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-red-600 duration-300" onClick={(e) => onDeleteImage}>Delete</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="submit" onClick={onCreateHotel} disabled={isLoading} className={`w-full rounded-md ${ isLoading ? 'bg-gray-600' : 'bg-indigo-600' } px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Save</button>
                    </div>
                </section>
            </main>
            <Footer />

        </div>
    );
};

export default addHotel;


export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { id, } = context.query;
    const session = await getSession(context);
    // const userEmail = session?.user?.email;

    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    let deturl = `${process.env.NEXT_PUBLIC_API_URL}/get-hotels/${id}`;
    const detailsResult = await fetch(deturl).then( (res) => res.json() );

    let citurl = `${process.env.NEXT_PUBLIC_API_URL}/get-city`;
    const responseCities = await fetch(citurl);
    const cities = await responseCities.json();

    let resurl = `${process.env.NEXT_PUBLIC_API_URL}/get-travel-style`;
    const responseTravelStyle = await fetch(resurl);
      const travelStyles = await responseTravelStyle.json();

    return {
        props: {
            session,
            travelStyles,
            detailsResult,
            cities
        },
    };
};

async function getSignature() {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/sign`;
    const response = await fetch(url);
    const data = await response.json();
    const { signature, timestamp } = data;
    return { signature, timestamp };
  }
  

 
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
import { ITravelStyle, uploadImage } from "@/types/typings";

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

type Props = {
    session: Session;
};

const addTravelStyle = ({ session }: Props)  => {

    
    const [files, setFile] = useState<any[]>([]);
    const [imageFiles, setImageFiles] = useState<any[]>([]);
    const [images, setImages] = useState<uploadImage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    //Message incase an error is encountered when selecting the images
    const [message, setMessage] = useState("");

    //City Details
    const [travelStyle, setTravelStyle] = useState<ITravelStyle>({   id : "",styleName : "",
                                                publicId : "",
                                                url      : "",
                                                status   : "",
                                            });

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
        if (validImageFiles.length && validImageFiles.length < 2 && images.length < 2) {
            setImageFiles(validImageFiles);
            return;
        }
        setMessage("Selected images are not of valid type\nOr\nImage Count is above allowed limit!");
    };

    const onCreateCity = useCallback(async () => {

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

                    travelStyle.publicId = list[0].publicId;
                    travelStyle.url      = list[0].url;
                    travelStyle.status   = list[0].status;

                    const ur_l =`${process.env.NEXT_PUBLIC_API_URL}/post-travel-style`
        await axios.post(ur_l, travelStyle).then(() => {
                router.push("/travelstyle");
            }).catch(() => {
                alert('Something went wrong.');
                setIsLoading(false);
            });
        },
        [
            travelStyle,
            images,
        ]);

    return (
        <div>
            
            {/* No Placeholder htmlFor Hotels from Favorite List */}
            <Header/>

            <div className=" h-[120px] sm:h-[120px] lg:h-[120px] xl-h-[120px] 2xl:h-[120px] bg-black"></div>
            <main className="flex flex-col max-w-4xl mx-auto">
                {/* Left Section */}
                <section className="flex-grow pt-14 px-6">

                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Travel Style Details</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Style Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="title" 
                             onChange={(e) => { travelStyle.styleName = e.target.value }}/>

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
                                        <div key={key} className="overflow-hidden relative">
                                            <img className="h-20 w-20 rounded-md" src={file.url} />
                                            <i onClick={() => { removeImage(file) }} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer h-10"></i>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="submit" onClick={onCreateCity} disabled={isLoading} className={`w-full rounded-md ${ isLoading ? 'bg-gray-600' : 'bg-indigo-600' } px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>Save</button>
                    </div>
                </section>
            </main>
            <Footer />

        </div>
    );
};

export default addTravelStyle;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
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

    return {
        props: {
            session,
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
  
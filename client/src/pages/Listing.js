import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css';

const Listing = () => {

    SwiperCore.use([Navigation]);
    const { listingId } = useParams();
    const [listing, setListing] = useState(null);

    useEffect(()=>{
        const fetchListing = async () => {
            try {
                const res = await fetch(`/api/listing/getListing/${listingId}`);
                const data = await res.json();
                setListing(data);
                //console.log(data.imageURLs)
            } catch (error) {
                console.error("Error fetching listing:", error);
            }
        }
        fetchListing();
    }, [listingId])

  return (
    <div>
        {listing && (
            <Swiper navigation>
                {listing.imageURLs.map((url) => (
                    <SwiperSlide key={url}>
                        <div className="w-full">
                            <img src={url} alt={listing?.name} className="h-[500px] w-full object-contain" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        )}
        
        <h1 className="text-2xl font-bold">{listing?.name}</h1>
    </div>
  )
}

export default Listing;
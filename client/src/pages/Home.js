import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { FaBath, FaBed, FaMapMarkerAlt } from 'react-icons/fa';

const Home=()=>{
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);
  
  //console.log(offerListings);
  
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/getListings?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/getListings?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/getListings?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);


  return (
    <div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-bold text-slate-700'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <div key={listing?.name} className="border p-3 rounded-lg mt-5 w-[400px]">
                <img src={listing?.imageURLs[0]} alt={listing?.name} className="w-50 h-48 object-cover rounded-lg" />
                <h2 className="font-semibold text-lg mt-1">{listing?.name}</h2>
                <p className="text-sm text-wrap text-slate-600">{listing?.description}</p>
                <div className='flex gap-[2px] mt-1 items-center'>
                    <FaMapMarkerAlt className="text-green-700" />
                    <span className="text-sm text-slate-600">{listing?.address}</span>
                </div>
                
                <div className='flex items-center gap-1 whitespace-nowrap mt-1'>
                    <FaBath className='text-lg' />
                    <span>{listing?.bathrooms > 1
                        ? `${listing?.bathrooms} baths `
                        : `${listing?.bathrooms} bath `}</span>

                    <FaBed className='text-lg' />
                    <span>{listing?.bedrooms > 1
                        ? `${listing?.bedrooms} baths `
                        : `${listing?.bedrooms} bath `}</span>
                </div>

                <p className="text-sm text-slate-600 mt-[2px]">Price: ${listing?.offer ? listing?.discountPrice : listing?.regularPrice}</p>
            </div>
              ))}
            </div>
          </div>
        )}


        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-bold text-slate-700'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <div key={listing?.name} className="border p-3 rounded-lg mt-5 w-[400px]">
                <img src={listing?.imageURLs[0]} alt={listing?.name} className="w-50 h-48 object-cover rounded-lg" />
                <h2 className="font-semibold text-lg mt-1">{listing?.name}</h2>
                <p className="text-sm text-wrap text-slate-600">{listing?.description}</p>
                <div className='flex gap-[2px] mt-1 items-center'>
                    <FaMapMarkerAlt className="text-green-700" />
                    <span className="text-sm text-slate-600">{listing?.address}</span>
                </div>
                
                <div className='flex items-center gap-1 whitespace-nowrap mt-1'>
                    <FaBath className='text-lg' />
                    <span>{listing?.bathrooms > 1
                        ? `${listing?.bathrooms} baths `
                        : `${listing?.bathrooms} bath `}</span>

                    <FaBed className='text-lg' />
                    <span>{listing?.bedrooms > 1
                        ? `${listing?.bedrooms} baths `
                        : `${listing?.bedrooms} bath `}</span>
                </div>

                <p className="text-sm text-slate-600 mt-[2px]">Price: ${listing?.offer ? listing?.discountPrice : listing?.regularPrice}</p>
            </div>
              ))}
            </div>
          </div>
        )}


        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-bold text-slate-700'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <div key={listing?.name} className="border p-3 rounded-lg mt-5 w-[400px]">
                <img src={listing?.imageURLs[0]} alt={listing?.name} className="w-50 h-48 object-cover rounded-lg" />
                <h2 className="font-semibold text-lg mt-1">{listing?.name}</h2>
                <p className="text-sm text-wrap text-slate-600">{listing?.description}</p>
                <div className='flex gap-[2px] mt-1 items-center'>
                    <FaMapMarkerAlt className="text-green-700" />
                    <span className="text-sm text-slate-600">{listing?.address}</span>
                </div>
                
                <div className='flex items-center gap-1 whitespace-nowrap mt-1'>
                    <FaBath className='text-lg' />
                    <span>{listing?.bathrooms > 1
                        ? `${listing?.bathrooms} baths `
                        : `${listing?.bathrooms} bath `}</span>

                    <FaBed className='text-lg' />
                    <span>{listing?.bedrooms > 1
                        ? `${listing?.bedrooms} baths `
                        : `${listing?.bedrooms} bath `}</span>
                </div>

                <p className="text-sm text-slate-600 mt-[2px]">Price: ${listing?.offer ? listing?.discountPrice : listing?.regularPrice}</p>
            </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;
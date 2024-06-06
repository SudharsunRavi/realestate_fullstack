import { useEffect, useState } from 'react';
import { FaBath, FaBed, FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {

    const navigate=useNavigate();
    const [listings, setListings] = useState([]);
    const [filterData, setFilterData] = useState(
        {
            search: '',
            type: 'all',
            offer: false,
            parking: false,
            furnished: false,
            sort: 'createdAt',
            order: 'desc'
        }
    );

    const handleDataChange = (e) => {
        if(e.target.id === 'search') {
            setFilterData({...filterData, search: e.target.value})
        }

        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setFilterData({...filterData, type: e.target.id})
        }

        if(e.target.id === 'offer' || e.target.id === 'parking' || e.target.id === 'furnished') {
            setFilterData({...filterData, [e.target.id]: e.target.checked || e.target.checked==="true" ? true : false})
        }

        if(e.target.id === 'sort_order') {
            let sort = e.target.value.split('_')[0] || "createdAt";
            let order = e.target.value.split('_')[1] || "desc";
            setFilterData({...filterData, sort: sort, order: order})
        }
    }
    //console.log(filterData)

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set('search', filterData.search);
        urlSearchParams.set('type', filterData.type);
        urlSearchParams.set('offer', filterData.offer);
        urlSearchParams.set('parking', filterData.parking);
        urlSearchParams.set('furnished', filterData.furnished);
        urlSearchParams.set('sort', filterData.sort);
        urlSearchParams.set('order', filterData.order);

        const searchQuery = urlSearchParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    useEffect(()=>{
        const urlSearchParams = new URLSearchParams(window.location.search);
        const searchTermURL = urlSearchParams.get('search');
        const typeURL = urlSearchParams.get('type');
        const offerURL = urlSearchParams.get('offer');
        const parkingURL = urlSearchParams.get('parking');
        const furnishedURL = urlSearchParams.get('furnished');
        const sortURL = urlSearchParams.get('sort');
        const orderURL = urlSearchParams.get('order');

        if(searchTermURL || typeURL || offerURL || parkingURL || furnishedURL || sortURL || orderURL) {
            setFilterData({
                search: searchTermURL || '',
                type: typeURL || 'all',
                offer: offerURL==="true" ? true : false,
                parking: parkingURL==="true" ? true : false,
                furnished: furnishedURL==="true" ? true : false,
                sort: sortURL || 'createdAt',
                order: orderURL || 'desc'
            })
        }

        const fetchAllListing=async()=>{
            const searchQuery=urlSearchParams.toString();
            const res=await fetch(`/api/listing/getListings?${searchQuery}`);
            const data=await res.json();
            setListings(data);
        }

        fetchAllListing();

    }, [window.location.search])

    console.log(listings)

  return (
    <div className="flex flex-col md:flex-row">
        <div className="py-5 px-3 border-b-2 sm:border-r-2 md:min-h-screen">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex gap-4 items-center">
                    <label className="font-medium whitespace-nowrap">Search:</label>
                    <input type="text" className="border w-full px-3 py-2 rounded-lg" placeholder="Search" id="search" autoComplete='off' onChange={handleDataChange} value={filterData.search}/>
                </div>

                <div className="flex gap-3 items-center flex-wrap">
                    <label className="font-medium">Type:</label>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id="all" className="w-5" onChange={handleDataChange} checked={filterData.type==="all"}/>
                        <span>Rent & Sale</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id="rent" className="w-4" onChange={handleDataChange} checked={filterData.type==="rent"}/>
                        <span>Rent</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id="sale" className="w-4" onChange={handleDataChange} checked={filterData.type==="sale"}/>
                        <span>Sale</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id="offer" className="w-4" onChange={handleDataChange} checked={filterData.offer} />
                        <span>Offer</span>
                    </div>  
                </div>

                <div className="flex gap-3 items-center flex-wrap">
                    <label className="font-medium">Amenities:</label>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id="parking" className="w-5" onChange={handleDataChange} checked={filterData.parking}/>
                        <span>Parking</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id="furnished" className="w-4" onChange={handleDataChange} checked={filterData.furnished}/>
                        <span>Furnished</span>
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <label className="font-medium">Sort:</label>
                    <select className="border px-3 py-2 rounded-lg" id="sort_order" onChange={handleDataChange} defaultValue={"created_at_desc"}>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                        <option value="regularPrice_desc">Price: High to Low</option>
                        <option value="regularPrice_asc">Price: Low to High</option>
                    </select>
                </div>

                <button className="bg-slate-600 text-white p-3 rounded-lg hover:opacity-90">SEARCH</button>
            </form>
        </div>

        <div className="py-5 px-3">
            <h1 className="font-semibold text-3xl">Listing results:</h1>
            <div className="">
                {listings.length===0 ? 
                    <h1 className='font-medium text-xl mt-7 text-red-600'>No listing found</h1> 
                : listings.map((listing)=>(
                    <Link to={`/listing/${listing._id}`}>
                        <div key={listing?.name} className="border p-3 rounded-lg mt-7">
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
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Search
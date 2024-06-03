import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UserListing = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [listings, setListings] = useState([]);
    const navigate=useNavigate();

    const handleShowListings = async () => {
        try {
            const res = await fetch(`/api/user/listing/${currentUser._id}`, {
                method: "GET",
            });
            const data = await res.json();
            setListings(data); 
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDeleteListing = async (listing_id) => {
        try {
            const res = await fetch(`/api/listing/delete/${listing_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            //console.log(data)
            handleShowListings();
            navigate('/user-listing');
        } catch (error) {
            console.log(error.message)
        }
    
    }

    useEffect(() => {
        handleShowListings();
    }, [currentUser]);

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-center my-10">Your Listings</h1>
            {listings.map((listing) => (
                <div key={listing._id} className="border border-gray-300 p-3 my-3 max-w-4xl mx-auto">
                    <Link to={`/listing/${listing._id}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <img src={listing.imageURLs[0]} alt={listing?.name} className="w-40 h-40 object-contain" />
                                <div>
                                    <h1 className="text-xl font-bold">{listing?.name}</h1>
                                    <p className="text-gray-500">{listing?.description}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:underline" onClick={()=>handleDeleteListing(listing._id)}>Delete</button>
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:underline" >Edit</button>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default UserListing;

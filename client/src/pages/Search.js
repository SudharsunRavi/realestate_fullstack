const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
        <div className="py-5 px-3 border-b-2 sm:border-r-2 md:min-h-screen">
            <form className="flex flex-col gap-5">
                <div className="flex gap-4 items-center">
                    <label className="font-medium whitespace-nowrap">Search:</label>
                    <input type="text" className="border w-full px-3 py-2 rounded-lg" placeholder="Search" id="search" />
                </div>

                <div className="flex gap-3 items-center flex-wrap">
                    <label className="font-medium">Type:</label>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id="all" className="w-5" />
                        <span>Rent & Sale</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id="rent" className="w-4" />
                        <span>Rent</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id="sale" className="w-4" />
                        <span>Sale</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id="offer" className="w-4" />
                        <span>Offer</span>
                    </div>  
                </div>

                <div className="flex gap-3 items-center flex-wrap">
                    <label className="font-medium">Amenities:</label>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id="parking" className="w-5" />
                        <span>Parking</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id="furnished" className="w-4" />
                        <span>Furnished</span>
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <label className="font-medium">Sort:</label>
                    <select className="border px-3 py-2 rounded-lg" id="sort_order">
                        <option>Latest</option>
                        <option>Oldest</option>
                        <option>Price: High to Low</option>
                        <option>Price: Low to High</option>
                    </select>
                </div>

                <button className="bg-slate-600 text-white p-3 rounded-lg hover:opacity-90">SEARCH</button>
            </form>
        </div>

        <div className="py-5 px-3">
            <h1 className="font-semibold text-2xl">Listing results:</h1>
        </div>
    </div>
  )
}

export default Search
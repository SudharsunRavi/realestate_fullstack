const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center my-10">Create a new listing</h1>

      <form className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col flex-1 gap-4">
          <input type="text" placeholder="Name" id="name" className="border rounded-lg px-3 py-2 focus:outline-none sm:w-96" required autoComplete="off"/>
          <textarea placeholder="Description" id="description" className="border rounded-lg px-3 py-2 focus:outline-none sm:w-96 h-24" maxLength='150' required autoComplete="off"/>
          <input type="text" placeholder="Address" id="address" className="border rounded-lg px-3 py-2 focus:outline-none sm:w-96" required autoComplete="off"/>

          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-4"/>
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-4"/>
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-4"/>
              <span>Parking</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-4"/>
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-4"/>
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-6 mt-1 flex-wrap">
            <div className="flex gap-1 items-center">
              <input type="number" id="bedrooms" min="1" className="border w-10 h-7 rounded-md focus:outline-none" required autoComplete="off"/>
              <span>Bedrooms</span>
            </div>

            <div className="flex gap-1 items-center">
              <input type="number" id="bathrooms" min="1" className="border w-10 h-7 rounded-md focus:outline-none" required autoComplete="off"/>
              <span>Bathrooms</span>
            </div>

            <div className="flex gap-1 items-center">
              <input type="number" id="regularPrice" min="1" className="border w-16 h-8 rounded-md focus:outline-none" required autoComplete="off"/>
              <div>
                <p>Regular Price</p>
                <span className="text-sm">($ / per month)</span>
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <input type="number" id="discountPrice" min="1" className="border w-16 h-8 rounded-md focus:outline-none" required autoComplete="off"/>
              <div>
                <p>Offer Price</p>
                <span className="text-sm">($ / per month)</span>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col flex-1 mt-2 sm:mt-0">
          <p className="font-semibold">Images:
            <span className="font-normal ml-2">Your first image will be cover (max 6)</span>
          </p>

          <div className="flex gap-4 items-center mt-2">
            <input type="file" accept="image/*" id="images" multiple className="border rounded-lg w-full p-3 focus:outline-none" required autoComplete="off"/>
            <button className="bg-slate-600 text-white p-3 rounded-lg hover:bg-slate-700">UPLOAD</button>
          </div>

          <button className="p-3 bg-slate-600 text-white rounded-lg hover:opacity-90 sm:mt-5">CREATE LISTING</button>
        </div>
      </form>
    </main>
  )
}

export default CreateListing
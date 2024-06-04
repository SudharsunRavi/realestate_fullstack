import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { app } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const UpdateListing = () => {
  const {listingId}= useParams();  
  const navigate=useNavigate();
  const [images, setImages] = useState([])
  const [uploadingImages, setUploadingImages] = useState(false)
  const [imageUploadError, setImageUploadError] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    imageURLs: [],
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const currentUser = useSelector(state => state.user.currentUser)

  const handleImageSubmit = () => {
    setUploadingImages(true)
    if (images.length === 0) {
      alert('Please select images to upload')
      setUploadingImages(false)
      return
    }
    if (images.length > 6) {
      alert('You can only upload 6 images')
      setUploadingImages(false)
      return
    }

    const promises = []
    for (let i = 0; i < images.length; i++) {
      promises.push(storeImage(images[i]))
    }
    Promise.all(promises)
      .then((urls) => {
        setFormData({ ...formData, imageURLs: formData.imageURLs.concat(urls) })
        setImageUploadError(false)
        setUploadingImages(false)
      })
      .catch((error) => {
        console.error("Error uploading images: ", error)
        setUploadingImages(false)
        setImageUploadError(true)
      })
  }

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + '-' + image.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, image)
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )
    })
  }

  const handleRemoveImage = (index) => {
    setFormData({ ...formData, imageURLs: formData.imageURLs.filter((_, i) => i !== index) })
  }

  const handleDataChange = (e) => {
    //handling type
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({ ...formData, type: e.target.id })
    }

    //handling boolean values
    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setFormData({ ...formData, [e.target.id]: e.target.checked })
    }

    //handling integer values
    if (e.target.id === 'bedrooms' || e.target.id === 'bathrooms' || e.target.id === 'regularPrice' || e.target.id === 'discountPrice') {
      setFormData({ ...formData, [e.target.id]: parseInt(e.target.value) })
    }

    if (e.target.id === 'name' || e.target.id === 'description' || e.target.id === 'address') {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      if (formData.imageURLs.length === 0) return setError('Please upload at least one image');
      if (formData.regularPrice < formData.discountPrice) return setError('Offer price should be less than regular price');
    
      //console.log(formData);
      const res = await fetch(`/api/listing/update/${listingId}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id })
      });
  
      if (!res.ok) {
        console.error('Response not ok:', res);
        const errorText = await res.text();
        throw new Error(errorText);
      }
  
      const data = await res.json();
      //console.log(data.updatedListing)
      navigate(`/listing/${data.updatedListing._id}`);
      if (data.success === false) setError(data.message);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
        try {
            const res = await fetch(`/api/listing/getListing/${listingId}`, {
            method: 'GET'
            })
            const data = await res.json()
            setFormData(data)
        } catch (error) {
            console.error('Error fetching listing:', error)
        }
    }

    fetchListing()
  }, [listingId]);
  

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center my-10">Update listing</h1>

      <form className="flex flex-col sm:flex-row gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col flex-1 gap-4">
          <input type="text" placeholder="Name" id="name" className="border rounded-lg px-3 py-2 focus:outline-none sm:w-96" value={formData.name} required autoComplete="off" onChange={handleDataChange} />
          <textarea placeholder="Description" id="description" className="border rounded-lg px-3 py-2 focus:outline-none sm:w-96 h-24" maxLength='150' value={formData.description} required autoComplete="off" onChange={handleDataChange} />
          <input type="text" placeholder="Address" id="address" className="border rounded-lg px-3 py-2 focus:outline-none sm:w-96" value={formData.address} required autoComplete="off" onChange={handleDataChange} />

          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-4" onChange={handleDataChange} checked={formData.type === "sale"} />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-4" onChange={handleDataChange} checked={formData.type === "rent"} />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-4" onChange={handleDataChange} checked={formData.parking} />
              <span>Parking</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-4" onChange={handleDataChange} checked={formData.furnished} />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-4" onChange={handleDataChange} checked={formData.offer} />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-6 mt-1 flex-wrap">
            <div className="flex gap-1 items-center">
              <input type="number" id="bedrooms" min="1" className="border w-10 h-7 rounded-md focus:outline-none" required autoComplete="off" onChange={handleDataChange} value={formData.bedrooms} />
              <span>Bedrooms</span>
            </div>

            <div className="flex gap-1 items-center">
              <input type="number" id="bathrooms" min="1" className="border w-10 h-7 rounded-md focus:outline-none" required autoComplete="off" onChange={handleDataChange} value={formData.bathrooms} />
              <span>Bathrooms</span>
            </div>

            <div className="flex gap-1 items-center">
              <input type="number" id="regularPrice" min="50" className="border w-16 h-8 rounded-md focus:outline-none" required autoComplete="off" onChange={handleDataChange} value={formData.regularPrice} />
              <div>
                <p>Regular Price</p>
                <span className="text-sm">($ / per month)</span>
              </div>
            </div>

            {formData.offer && (<div className="flex gap-1 items-center">
              <input type="number" id="discountPrice" min="0" className="border w-16 h-8 rounded-md focus:outline-none" required autoComplete="off" onChange={handleDataChange} value={formData.discountPrice} />
              <div>
                <p>Offer Price</p>
                <span className="text-sm">($ / per month)</span>
              </div>
            </div>)}
          </div>

        </div>

        <div className="flex flex-col flex-1 mt-2 sm:mt-0">
          <p className="font-semibold">Images:
            <span className="font-normal ml-2">Your first image will be cover (max 6)</span>
          </p>

          <div className="flex gap-4 items-center mt-2">
            <input type="file" accept="image/*" id="images" multiple className="border rounded-lg w-full p-3 focus:outline-none" autoComplete="off" onChange={(e) => setImages(e.target.files)} />
            <button type="button" disabled={uploadingImages} className="bg-slate-600 text-white p-3 rounded-lg hover:bg-slate-700" onClick={handleImageSubmit}>{uploadingImages ? "Uploading..." : "UPLOAD"}</button>
          </div>

          {imageUploadError && <p className="text-red-500 text-sm mt-2">Error uploading images</p>}
          {
            formData.imageURLs.length > 0 &&
            <div className="flex flex-col gap-2 mt-2">
              {formData.imageURLs.map((url, index) => (
                <div className='flex gap-7 items-center' key={url}>
                  <img src={url} alt="listing" className="w-36 h-24 object-contain rounded-lg" />
                  <button type='button' className='bg-red-700 rounded-lg py-1 px-2 text-white cursor-pointer' onClick={() => handleRemoveImage(index)}>Delete</button>
                </div>
              ))}
            </div>
          }

          <button className="p-3 bg-slate-600 text-white rounded-lg hover:opacity-90 mt-3 sm:mt-5">UPDATE LISTING</button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </form>
    </main>
  )
}

export default UpdateListing

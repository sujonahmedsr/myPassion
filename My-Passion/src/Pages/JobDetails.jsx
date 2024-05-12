// import { useContext } from "react"
// import { AuthContext } from "../AuthProvider/AuthProvider"
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../useAuthCustomHook/useAuth";

const JobDetails = () => {
  const [startDate, setStartDate] = useState(new Date());
  // const {user} = useContext(AuthContext);
  const { user } = useAuth()
  const navigate = useNavigate()
  const job = useLoaderData()
  const {_id, deadline, category, job_title, short_description, min_price, max_price, ownerEmail, ownerName, ownerPhoto} = job;

  const handleBidPlace = e =>{
    
    e.preventDefault()
    if(user?.email === ownerEmail){
      return toast.error('Action not valid')
    }
    const from = e.target;
    const id = _id;
    const price = parseFloat(from.price.value);
    if(price < min_price){
      return toast.error('offer more or at least equal to minimum price')
    }
    const userEmail = user?.email;
    const deadline = startDate;
    const comment = from.comment.value;
    const Buyer_email = ownerEmail;
    const status = 'pending';
    const bidPro = {id, price, userEmail, comment, deadline, category, Buyer_email, status}
    console.table(bidPro);
    try {
      axios.post(`${import.meta.env.VITE_API_KEY}/bids`, bidPro)
      .then(res => {
        console.log(res.data);
        navigate('/myBids')
        toast.success('your bid successfully added')
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto py-20 px-3'>
      {/* Job Details */}
      <div className='flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-light text-gray-800 '>
            Deadline : {new Date(deadline).toLocaleDateString()}
          </span>
          <span className='px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full '>
          {category}
          </span>
        </div>

        <div>
          <h1 className='mt-2 text-3xl font-semibold text-gray-800 '>
            {job_title}
          </h1>

          <p className='mt-2 text-lg text-gray-600 '>
          {`${short_description}`}
          </p>
          <p className='mt-6 text-sm font-bold text-gray-600 '>
            Buyer Details:
          </p>
          <div className='flex items-center gap-5'>
            <div>
              <p className='mt-2 text-sm  text-gray-600 '>Name: {ownerName || 'no name'}.</p>
              <p className='mt-2 text-sm  text-gray-600 '>
                {`Email: ${ownerEmail || 'no email'}`}
              </p>
            </div>
            <div className='rounded-full object-cover overflow-hidden w-14 h-14'>
              <img src={ownerPhoto} alt='' />
            </div>
          </div>
          <p className='mt-6 text-lg font-bold text-gray-600 '>
          Range: {`$ ${min_price} - $ ${max_price}`}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className='p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]'>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Place A Bid
        </h2>

        <form onSubmit={handleBidPlace}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='price'>
                Price
              </label>
              <input
                id='price'
                type='text'
                name='price'
                required
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                readOnly
                defaultValue={user?.email}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='comment'>
                Comment
              </label>
              <input
                id='comment'
                name='comment'
                type='text'
                required
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

              <DatePicker className='block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring' selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
          </div>

          <div className='flex justify-end mt-6'>
            <button
              type='submit'
              className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default JobDetails

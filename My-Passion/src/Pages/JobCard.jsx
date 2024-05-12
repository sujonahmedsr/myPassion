/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"

const JobCard = ({job}) => {
  return (
    <Link to={`/details/${job._id}`} className='w-full max-w-sm px-4 py-3 bg-white rounded-md border font-lato shadow-md hover:scale-[1.05] transition-all'>
      <div className='flex items-center justify-between'>
        <span className='text-xs font-light text-gray-800 '>
        Deadline: {new Date(job.deadline).toLocaleDateString()}
        </span>
        <span className='px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full '>
          {job.category}
        </span>
      </div>
      <div>
        <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
          Build Dynamic Website Using React
        </h1>

        <p className='mt-2 text-sm text-gray-600 '>
          {`${job.short_description}`}
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>
          Range: {`$ ${job.min_price} - $ ${job.max_price}`}
        </p>
      </div>
    </Link>
  )
}

export default JobCard

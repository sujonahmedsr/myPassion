import { useEffect, useState } from "react"
// import { AuthContext } from "../AuthProvider/AuthProvider"
import axios from "axios"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../useAuthCustomHook/useAuth";

const MyPost = () => {
  // const { user } = useContext(AuthContext)
  const { user } = useAuth()
  const [myPost, setMyPost] = useState([])
  const getData = async () => {
    const { data } = await axios(`${import.meta.env.VITE_API_KEY}/job/${user?.email}`, {withCredentials: true})
    setMyPost(data)
  }

  useEffect(() => {
    getData()
  }, [user])


  const handleDelete = id =>{
    axios.delete(`${import.meta.env.VITE_API_KEY}/jobs/${id}`)
    .then(res => {
      console.log(res.data);
      confirm('are you deleted')
      getData()
    })
  }
  return (
    <section className='container px-4 mx-auto py-20'>
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium text-gray-800 '>My Bids</h2>

        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
          {myPost.length} Bid
        </span>
      </div>

      <div className='flex flex-col mt-6'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Title</span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <span>Deadline</span>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <button className='flex items-center gap-x-2'>
                        <span>Price</span>
                      </button>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Category
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Description
                    </th>

                    <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>
                  {
                    myPost.map(mybid => <tr key={mybid._id}>
                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {mybid.job_title}
                      </td>

                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      {new Date(mybid.deadline).toLocaleDateString()}
                      </td>

                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {mybid.max_price}
                      </td>
                      <td className='px-4 py-4 text-sm whitespace-nowrap'>
                        <div className='flex items-center gap-x-2'>
                          <p
                            className={`px-3 py-1 rounded-full ${mybid.category === 'Web Development' && 'text-blue-500'} ${mybid.category === 'Digital Marketing' && 'text-pink-500'} ${mybid.category === 'Graphics Design' && 'text-emerald-500'}   bg-blue-100/60
                             text-xs`}
                          >
                            {mybid.category}
                          </p>
                        </div>
                      </td>
                      <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                        <div className='inline-flex items-center px-3 py-1 rounded-full gap-x-2 '>
                          <span className='h-1.5 w-1.5 rounded-full'></span>
                          <h2 className='text-sm font-normal '>{mybid.short_description.slice(0,30)}</h2>
                        </div>
                      </td>
                      <td className='px-4 py-4 text-sm whitespace-nowrap space-x-3'>
                        <Link to={`/update/${mybid._id}`}>
                        <button
                          className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none disabled:cursor-not-allowed text-2xl'
                        >
                          <FaRegEdit></FaRegEdit>
                          
                        </button>
                        </Link>
                        <button onClick={()=>handleDelete(`${mybid._id}`)}
                          className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none disabled:cursor-not-allowed text-2xl'
                        >
                          <MdDelete></MdDelete>
                          
                        </button>
                      </td>
                    </tr>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyPost

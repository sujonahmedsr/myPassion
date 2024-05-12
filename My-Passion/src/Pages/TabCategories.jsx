// import { useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
const TabCategories = () => {
    const [jobsDetails, setJobsDetails] = useState([])
    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_KEY}/jobs`, { withCredentials: true })
        setJobsDetails(data)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className=' text-center'>
            <Tabs>
                <TabList>
                    <Tab>Web development</Tab>
                    <Tab>Graphic Design</Tab>
                    <Tab>Digital Marketing</Tab>
                </TabList>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10'>
                        {
                            jobsDetails.filter(j => j.category === 'Web Development')
                                .map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10'>
                        {
                            jobsDetails.filter(j => j.category === 'Graphics Design')
                                .map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10'>
                        {
                            jobsDetails.filter(j => j.category === 'Digital Marketing')
                                .map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>

    );
};

export default TabCategories;
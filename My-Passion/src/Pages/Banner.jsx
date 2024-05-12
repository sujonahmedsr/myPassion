
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from '../assets/images/carousel1.jpg'
import img2 from '../assets/images/carousel2.jpg'
import img3 from '../assets/images/carousel3.jpg'


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Banner = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="hero h-[85vh]">
                        <img src={img1} className='h-full' alt=""/>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-2xl">
                                <h1 className="mb-5 text-5xl font-bold">Get Your Web Development Projects Done in minutes</h1>
                                
                                <button className="btn ">Post Job & Hire Expert</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="hero h-[85vh]">
                        <img src={img2} className='h-full' alt=""/>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-2xl">
                                <h1 className="mb-5 text-5xl font-bold">Get Your Graphics Design Projects Done in minutes</h1>
                                
                                <button className="btn ">Post Job & Hire Expert</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="hero h-[85vh]">
                        <img src={img3} className='h-full' alt=""/>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-2xl">
                                <h1 className="mb-5 text-5xl font-bold">Start Your Digital Marketing Campaigns up n running</h1>
                                
                                <button className="btn ">Post Job & Hire Expert</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
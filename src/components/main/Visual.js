import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, } from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
export default function Visual() {

    return (
        <section className="visual">
            <div className="inner">
                <div className="visual_btns">
                    <div className="prev">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div className="next">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                </div>

                <Swiper
                    className="img_container"
                    modules={[Navigation, Pagination, EffectFade]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation={
                        {
                            nextEl: ".next",
                            prevEl: ".prev"
                        }
                    }
                    loop
                >
                    <SwiperSlide className="img_box">
                        <div className="img_img">
                            <img src="" alt="" />
                        </div>
                        <div className="img_txt">
                            <h1 className="img_title">
                                Lorem ipsum dolor sit.
                            </h1>
                            <p className="img_desc">
                                Lorem ipsum, dolor sit amet consectetur adipisicing.
                            </p>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="img_box">
                        <div className="img_img">
                            <img src="" alt="" />
                        </div>
                        <div className="img_txt">
                            <h1 className="img_title">
                                Lorem ipsum dolor sit.
                            </h1>
                            <p className="img_desc">
                                Lorem ipsum, dolor sit amet consectetur adipisicing.
                            </p>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="img_box">
                        <div className="img_img">
                            <img src="" alt="" />
                        </div>
                        <div className="img_txt">
                            <h1 className="img_title">
                                Lorem ipsum dolor sit.
                            </h1>
                            <p className="img_desc">
                                Lorem ipsum, dolor sit amet consectetur adipisicing.
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section >
    )
}
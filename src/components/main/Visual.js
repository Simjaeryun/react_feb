import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, } from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
export default function Visual() {
    const path = process.env.PUBLIC_URL;
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
                            <img src={`${path}/img/main_banner1.jpg`} alt="패션쇼 모델워킹" />
                        </div>

                    </SwiperSlide>
                    <SwiperSlide className="img_box">
                        <div className="img_img">
                            <img src={`${path}/img/main_banner2.jpg`} alt="패션쇼 모델워킹" />
                        </div>

                    </SwiperSlide>
                    <SwiperSlide className="img_box">
                        <div className="img_img">
                            <img src={`${path}/img/main_banner3.jpg`} alt="패션쇼 모델워킹" />
                        </div>

                    </SwiperSlide>
                </Swiper>
            </div>
        </section >
    )
}
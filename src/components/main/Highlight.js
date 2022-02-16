import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

export default function Highlight() {

    return (
        <section className="highlight">
            <div className="inner">
                <h1>HIGHLIGHT</h1>
                <div>
                    <Swiper
                        className="img_container"
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={3}
                        pagination={{ clickable: true }}
                        scrollbar
                    >

                        <SwiperSlide className="img_box">
                            <h2 className="img_title">
                                Lorem ipsum dolor sit.
                            </h2>
                            <p className="img_txt">
                                Lorem ipsum, dolor sit amet consectetur adipisicing.
                            </p>
                        </SwiperSlide>
                        <SwiperSlide className="img_box">
                            <h2 className="img_title">
                                Lorem ipsum dolor sit.
                            </h2>
                            <p className="img_txt">
                                Lorem ipsum, dolor sit amet consectetur adipisicing.
                            </p>
                        </SwiperSlide>
                        <SwiperSlide className="img_box">
                            <h2 className="img_title">
                                Lorem ipsum dolor sit.
                            </h2>
                            <p className="img_txt">
                                Lorem ipsum, dolor sit amet consectetur adipisicing.
                            </p>
                        </SwiperSlide>
                        <SwiperSlide className="img_box">
                            <h2 className="img_title">
                                Lorem ipsum dolor sit.
                            </h2>
                            <p className="img_txt">
                                Lorem ipsum, dolor sit amet consectetur adipisicing.
                            </p>
                        </SwiperSlide>
                        <SwiperSlide className="img_box">
                            <h2 className="img_title">
                                Lorem ipsum dolor sit.
                            </h2>
                            <p className="img_txt">
                                Lorem ipsum, dolor sit amet consectetur adipisicing.
                            </p>
                        </SwiperSlide>
                        <SwiperSlide className="img_box">
                            <h2 className="img_title">
                                Lorem ipsum dolor sit.
                            </h2>
                            <p className="img_txt">
                                Lorem ipsum, dolor sit amet consectetur adipisicing.
                            </p>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section >
    )
}
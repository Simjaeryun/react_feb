import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useSelector } from 'react-redux';

export default function Highlight() {
    const flickerImg = useSelector(state => state.flickerReducer.flicker)
    return (
        <section className="highlight myScroll">
            <div className="inner">
                <h1>HIGHLIGHT</h1>
                <div>

                    <Swiper
                        className="img_container"
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={15}
                        slidesPerView={1}
                        scrollbar={{ draggable: true }}
                        breakpoints={{
                            1650: {
                                slidesPerView: 4
                            },
                            1000: {
                                slidesPerView: 3
                            },
                            600: {
                                slidesPerView: 2
                            }
                        }}
                    >
                        {flickerImg.map((data, idx) => {
                            const len = data.title.length;
                            return (
                                idx < 20 && idx > 12 ?
                                    < SwiperSlide className="img_box" key={idx}>
                                        <img src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`} alt="" />
                                        <div className="img_txt">
                                            <h2 className="img_title">
                                                {len > 30 ? data.title.substring(0, 30) : data.title}
                                            </h2>
                                            <p className="img_des">
                                                Lorem ipsum, dolor sit amet consectetur adipisicing.
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                    : null
                            )
                        })}

                    </Swiper>
                </div>
            </div>
        </section >
    )
}
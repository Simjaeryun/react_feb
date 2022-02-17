import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, EffectCoverflow, EffectCube, Navigation, Pagination, } from 'swiper';


export default function Youtube() {
    const path = process.env.PUBLIC_URL;
    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0);
    const main = useRef(null);
    const vidData = useSelector(state => state.youtubeReducer.youtube);

    useEffect(() => {
        main.current.classList.add('on');

    }, []);

    return (
        <>
            <main className="content youtube" ref={main}>
                <figure>
                    <img src={`${path}/img/youtube.jpg`} alt="" />
                    <h1>VIDEO</h1>
                </figure>
                <div className="inner">


                    <section>
                        <h2 className="youtube_content_title"><strong>P</strong>opular <br /><strong>V</strong>ideos</h2>
                        <Swiper
                            className="hot_youtube"
                            modules={[Navigation, EffectCoverflow]}
                            spaceBetween={50}
                            slidesPerView={3}
                            loop
                            effect='coverflow'
                        >
                            {vidData.map((item, idx) => {
                                return (
                                    idx > 5
                                        ?
                                        <SwiperSlide key={idx} className="hot_yotube_content">
                                            <div className="pic" onClick={(e) => {
                                                setIsPop(true);
                                                setIndex(idx);
                                            }}>
                                                <img src={item.snippet.thumbnails.maxres.url} alt="" />
                                            </div>
                                        </SwiperSlide>
                                        : null
                                )
                            })}
                        </Swiper>


                        <h2 className="youtube_content_title"><strong>A</strong>ll<br /><strong>V</strong>ideos</h2>
                        <Swiper
                            className="all_youtube"
                            modules={[Navigation, Pagination]}
                            spaceBetween={50}
                            slidesPerView={4}
                            pagination={{ clickable: true }}
                            loop
                        >

                            {vidData.map((item, idx) => {
                                return (
                                    <SwiperSlide key={idx}>
                                        <div className="pic" onClick={(e) => {
                                            setIsPop(true);
                                            setIndex(idx);
                                        }}>
                                            <img src={item.snippet.thumbnails.maxres.url} alt="" />
                                        </div>

                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </section>
                </div>
            </main>
            {isPop ? <Popup /> : null}
        </>
    )

    function Popup() {
        useEffect(() => {
            document.body.style.overflow = "hidden";
            return () => document.body.style.overflow = "auto";
        })

        return (
            <aside className="popup">
                <iframe
                    title="youtube"
                    src={"https://www.youtube.com/embed/" + vidData[index].snippet.resourceId.videoId}
                    width='100%'
                    height='100%'
                    allowFullScreen
                ></iframe>
                <span onClick={() => {
                    setIsPop(false);
                }}>Close</span>
            </aside>
        )
    }
}
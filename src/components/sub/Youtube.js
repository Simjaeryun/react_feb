import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, } from 'swiper';


export default function Youtube() {
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
                <div className="inner">
                    <section>
                        <div className="hot_youtube_container">
                            <Swiper
                                className="hot_youtube"
                                modules={[Navigation, Autoplay]}
                                spaceBetween={0}
                                slidesPerView={1}
                                loop
                                autoplay={{
                                    delay: 1000,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    1200: { slidesPerView: 2 }
                                }}
                            >
                                {vidData.map((item, idx) => {
                                    return (
                                        idx < 10
                                            ?
                                            <SwiperSlide key={idx} className="hot_yotube_content">
                                                <img
                                                    src={item.snippet.thumbnails.maxres.url}
                                                    alt=""
                                                    onClick={(e) => {
                                                        setIsPop(true);
                                                        setIndex(idx);
                                                    }}
                                                />
                                            </SwiperSlide>
                                            : null
                                    )
                                })}
                            </Swiper>
                        </div>
                        <div className="youtube_container">
                            <div className="youtube_column">
                                <h2 className="youtube_content_title"><strong>K</strong>OREA</h2>
                                <div className="all_youtube">
                                    {vidData.map((item, idx) => {
                                        return (
                                            idx > 9 && idx < 20 ?
                                                <div key={idx} className="all_youtube_content">
                                                    <div className="pic" onClick={(e) => {
                                                        setIsPop(true);
                                                        setIndex(idx);
                                                    }}>
                                                        <img src={item.snippet.thumbnails.standard.url} alt="" />
                                                    </div>
                                                </div>
                                                : null
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="youtube_column">
                                <h2 className="youtube_content_title"><strong>J</strong>APEN</h2>
                                <div className="all_youtube">
                                    {vidData.map((item, idx) => {
                                        return (
                                            idx > 19 && idx < 30 ?
                                                <div key={idx} className="all_youtube_content">
                                                    <div className="pic" onClick={(e) => {
                                                        setIsPop(true);
                                                        setIndex(idx);
                                                    }}>
                                                        <img src={item.snippet.thumbnails.standard.url} alt="" />
                                                    </div>
                                                </div>
                                                : null
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="youtube_column">
                                <h2 className="youtube_content_title"><strong>U</strong>SA</h2>
                                <div className="all_youtube">

                                    {vidData.map((item, idx) => {
                                        return (
                                            idx < 10 ?
                                                <div key={idx} className="all_youtube_content">
                                                    <div className="pic" onClick={(e) => {
                                                        setIsPop(true);
                                                        setIndex(idx);
                                                    }}>
                                                        <img src={item.snippet.thumbnails.standard.url} alt="" />
                                                    </div>
                                                </div>
                                                : null
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
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
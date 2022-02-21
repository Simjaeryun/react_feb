import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
export default function About() {
    const main = useRef(null);
    const members = useSelector(state => state.aboutReducer.members)
    const path = process.env.PUBLIC_URL;
    useEffect(() => {
        main.current.classList.add("on");
    }, [])

    return (
        <main className="content about" ref={main}>

            <div className="inner">
                <h1>
                    #ABOUT
                </h1>
                <section className="about_we">
                    <h2>

                        <strong>W</strong>HO<br />
                        A<strong>R</strong>E <br />
                        WE<strong>?</strong>
                    </h2>
                    <div className="about_we_content">
                        <p className="about_we_txt">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem maxime odit molestiae? Praesentium saepe dicta corporis beatae, consequuntur est! Illum vero aut modi officiis doloribus aliquam asperiores minus repudiandae maxime.
                        </p>
                        <Swiper
                            className="about_we_pic"
                            modules={[Navigation, Pagination, Scrollbar]}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}

                        >
                            <SwiperSlide>
                                <img src={`${path}/img/about_we1.jpg`} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={`${path}/img/about_we2.jpg`} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={`${path}/img/about_we3.jpg`} alt="" />
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </section>

                <section className="about_member">
                    <h2>
                        <strong>M</strong>EMBER<br />
                    </h2>
                    <div className="about_member_content">
                        {members.map((member, idx) => {
                            return (
                                <article key={idx}>
                                    <img src={`${path}/img/${member.pic}`} alt="profile사진" />
                                    <div className="about_member_txt">
                                        <h3>{member.name}</h3>
                                        <h4>{member.position}</h4>
                                        <p>{member.desc}</p>
                                    </div>
                                </article>
                            )
                        })}

                    </div>

                </section>
            </div >
        </main >
    )
}
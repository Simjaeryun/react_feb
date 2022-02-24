import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setFlicker } from '../../redux/actions';
import Masonry from 'react-masonry-component';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, EffectCube } from 'swiper';
import { type } from '@testing-library/user-event/dist/type';

export default function Gallery() {
    const main = useRef(null);
    const frame = useRef(null);
    const input = useRef(null);

    const photoData = useSelector(state => state.flickerReducer.flicker);

    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [enableClick, setEnableClick] = useState(true);
    const [isInterest, setIsInterest] = useState(true);

    const path = process.env.PUBLIC_URL;
    const dispatch = useDispatch();

    const masonryOptions = {
        fitWidth: false,
        gutter: 0,
        itemSelector: '.item',
        transitionDuration: '0.5s'
    }
    const getFlickr = async opt => {
        const api_key = "f7cfb698e2ac45b786af0b554ec7cd09";
        const method1 = 'flickr.interestingness.getList';
        const method2 = 'flickr.photos.search'
        const num = opt.count;
        let url = '';
        if (opt.type === 'interest') {
            url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1&`
        }
        if (opt.type === 'search') {
            url = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
        }
        await axios.get(url).then(json => {
            if (json.data.photos.photo.length === 0) {
                alert("해당 검색어의 이미지가 없습니다.")
                return;
            }
            dispatch(setFlicker(json.data.photos.photo))
        })
        setLoading(false);
        setEnableClick(true);
    }

    const showInterest = () => {
        if (enableClick && !isInterest) {
            setIsInterest(false);
            setEnableClick(false);
            setLoading(true);
            frame.current.classList.remove('on');
            getFlickr({
                type: 'interest',
                count: 50,
            })
        }
    }
    const showSearch = () => {
        const result = input.current.value.trim();

        if (result === "") {
            alert("검색어를 입력하세요")
            return;
        }
        if (enableClick) {
            showInterest(false)
            setEnableClick(false);
            setLoading(true);
            frame.current.classList.remove('on');
            getFlickr({
                type: 'search',
                count: 50,
                tags: result
            })
        }
        input.current.value = ""
    }
    const handleKeyUp = e => {
        if (e.key === 'Enter') {
            showSearch();
        }
    }

    useEffect(() => {
        getFlickr({
            type: 'interest',
            count: 50
        });
        return () => {
            setLoading(false);
        }
    }, []);

    return (
        <>
            <main className="content gallery" ref={main}>
                <div className="inner">
                    <h1 onClick={showInterest}>#GALLERY</h1>

                    <h2><strong>B</strong>EST<br /> <strong>O</strong>F<br /> <strong>B</strong>EST</h2>
                    <div className='best_photo'>
                        <Swiper
                            modules={[EffectCoverflow, EffectCube]}
                            className='best_photo_list'
                            spaceBetween={50}
                            slidesPerView={3}
                            effect={"coverflow"}
                            loop
                        >
                            {photoData.map((data, idx) => {
                                return (
                                    idx < 6 ?
                                        <SwiperSlide key={idx}>
                                            <img
                                                src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`}
                                                alt=""
                                                data={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
                                                onClick={() => {
                                                    setIsPop(true);
                                                    setIndex(idx);
                                                }} />
                                        </SwiperSlide>
                                        : null
                                )
                            })}
                        </Swiper>
                    </div>
                    <h2><strong>S</strong>EARCH <br /> <strong>P</strong>HOTO</h2>
                    <div className="searchBox">
                        <input
                            type="text"
                            ref={input}
                            onKeyUp={handleKeyUp}
                            placeholder="Please enter your search term"
                        />
                        <button onClick={showSearch}>Search</button>
                        {loading ?
                            <img
                                alt="loading 움직이는 이미지"
                                className='loading'
                                src={path + '/img/loading.gif'}
                            />
                            : null}
                    </div>
                    <section
                        ref={frame}
                        className={!loading ? "on" : ""}
                    >
                        <Masonry
                            elementType={'div'}
                            options={masonryOptions}
                        >
                            {photoData.map((item, idx) => {
                                return (
                                    <article key={idx} className='item'>
                                        <div className="inner">
                                            <div
                                                className="pic"
                                                data={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`}
                                                onClick={() => {
                                                    setIsPop(true);
                                                    setIndex(idx);
                                                }}>
                                                <img
                                                    src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_z.jpg`}
                                                    alt="Flickr에서 가져온 이미지"
                                                />
                                            </div>

                                        </div>
                                    </article>
                                )
                            })}
                        </Masonry>
                    </section>
                </div>
            </main>

            {isPop ? <Popup /> : null}
        </>
    )

    function Popup() {
        useEffect(() => {
            document.body.style.overflow = 'hidden';
            return () => document.body.style.overflow = 'auto';
        }, [])

        return (
            <aside className="popup">
                <h1>{photoData[index].title}</h1>
                <img src={`https://live.staticflickr.com/${photoData[index].server}/${photoData[index].id}_${photoData[index].secret}_b.jpg`} alt="flickr에서 가져온 이미지" />
                <span onClick={() => {
                    setIsPop(false);
                }}>close</span>
            </aside>
        )
    }
}
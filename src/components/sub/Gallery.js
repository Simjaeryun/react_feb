import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import Masonry from 'react-masonry-component';

export default function Gallery() {
    const main = useRef(null);
    const frame = useRef(null);
    const input = useRef(null);

    const [items, setItems] = useState([]);
    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [enableClick, setEnableClick] = useState(true);
    const [isInterest, setIsInterest] = useState(true);

    const path = process.env.PUBLIC_URL;

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
            url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;
        }
        if (opt.type === 'search') {
            url = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
        }

        await axios.get(url).then(json => {
            if (json.data.photos.photo.length === 0) {
                alert("해당 검색어의 이미지가 없습니다.")
                return;
            }
            setItems(json.data.photos.photo);
        })
        setTimeout(() => {
            frame.current.classList.add('on');
            setLoading(false);
            setTimeout(() => {
                setEnableClick(true);
            }, 1000)
        }, 1000)
    }

    const showInterest = () => {

        if (enableClick && !isInterest) {
            setIsInterest(false);
            setEnableClick(false);
            setLoading(true);
            frame.current.classList.remove('on');
            getFlickr({
                type: 'interest',
                count: 500,
            })
        }
    }
    const showSearch = () => {
        const result = input.current.value.trim();
        console.log(items);
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
                count: 500,
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
        main.current.classList.add('on');
        getFlickr({
            type: 'interest',
            count: 500
        });
    }, []);

    return (
        <>
            <main className="content gallery" ref={main}>
                <figure></figure>

                <div className="inner">
                    <h1 onClick={showInterest}>Gallery</h1>
                    <div className="seachBox">
                        <input type="text" ref={input} onKeyUp={handleKeyUp} />
                        <button onClick={showSearch}>Search</button>
                    </div>
                    {loading ? <img alt="loading 움직이는 이미지" className='loading' src={path + '/img/loading.gif'} /> : null}
                    <section ref={frame}>
                        <Masonry
                            elementType={'div'}
                            options={masonryOptions}
                        >
                            {items.map((item, idx) => {
                                return (
                                    <article key={idx} className='item'>
                                        <div className="inner">
                                            <div className="pic" data={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} onClick={() => {
                                                setIsPop(true);
                                                setIndex(idx);
                                            }}>
                                                <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt="Flickr에서 가져온 이미지" />
                                            </div>

                                            <h2>{item.title}</h2>
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
                <h1>{items[index].title}</h1>
                <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} alt="flickr에서 가져온 이미지" />
                <span onClick={() => {
                    setIsPop(false);
                }}>close</span>
            </aside>
        )
    }
}
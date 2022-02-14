import axios from 'axios';
import { useEffect, useRef, useState } from "react";

export default function Gallery() {
    const main = useRef(null);
    const frame = useRef(null)
    const [items, setItems] = useState([]);
    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0);
    const api_key = "f7cfb698e2ac45b786af0b554ec7cd09";
    const method1 = 'flickr.interestingness.getList';
    const method2 = 'flickr.photos.search'
    const num = 50;
    const tags = "ocean"
    const url1 = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;
    const url2 = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1&tags=${tags}`;

    useEffect(() => {
        main.current.classList.add('on');
        getFlicker(url1);
    }, []);

    const getFlicker = async (url) => {
        await axios.get(url).then(json => {
            setItems(json.data.photos.photo);
        })
        frame.current.classList.add("on");
    }

    return (
        <>
            <main className="content gallery" ref={main}>
                <figure></figure>

                <div className="inner">
                    <h1>Gallery</h1>
                    <button onClick={() => {
                        frame.current.classList.remove("on");
                        getFlicker(url2)
                    }}>검색어보기</button>
                    <section ref={frame}>
                        {items.map((item, idx) => {
                            return (
                                <article key={idx}>
                                    <div className="inner">
                                        <div className="pic" onClick={() => {
                                            setIsPop(true);
                                            setIndex(idx);
                                        }}>
                                            <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt="" />
                                        </div>

                                        <h2>{item.title}</h2>
                                    </div>
                                </article>
                            )
                        })}
                    </section>
                </div>
            </main>

            {isPop ? <Popup /> : null}
        </>
    )

    function Popup() {
        useEffect(() => {
            document.body.style.overflow = "hidden";
            return (
                () => document.body.style.overflow = "auto"
            )
        }, [])
        return (
            <aside className="popup">
                <h1>{items[index].title}</h1>
                <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} alt="" />
                <span onClick={() => {
                    setIsPop(false);
                }}>close</span>
            </aside>
        )
    }
}
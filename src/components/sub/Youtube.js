import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Youtube() {
    const key = "AIzaSyDTqpCGvBZz_l-UfWUkSY-UWyzxgO58z2I";
    const playListId = "PLsGbxh85lJXJyWJZ07m7tRiDPqQJNAlZL";
    const num = 5;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResult=${num}`;
    const [items, setItems] = useState([]);
    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0);
    const main = useRef(null);

    useEffect(() => {
        main.current.classList.add('on');

        axios.get(url).then(json => {
            console.log(json.data.items);
            setItems(json.data.items);
        })
    }, [url]);

    return (
        <>
            <main className="content youtube" ref={main}>
                <figure></figure>

                <div className="inner">
                    <h1>Youtube</h1>
                    <section>
                        {items.map((item, idx) => {
                            let tit = item.snippet.title;
                            let tit_len = tit.length;

                            let desc = item.snippet.description;
                            let desc_len = desc.length;
                            return (
                                <article key={idx}>
                                    <div className="inner">
                                        <div className="txt">
                                            <h2>{tit_len > 40 ? tit.substr(0, 40) + "..." : tit}</h2>
                                            <p>{desc_len > 150 ? desc.substr(0, 150) + "..." : desc}</p>
                                        </div>
                                        <div className="pic" onClick={(e) => {
                                            setIsPop(true);
                                            setIndex(idx);
                                        }}>
                                            <img src={item.snippet.thumbnails.standard.url} alt="" />
                                        </div>
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
            return () => document.body.style.overflow = "auto";
        })
        return (
            <aside className="popup">
                <iframe
                    title="youtube"
                    src={"https://www.youtube.com/embed/" + items[index].snippet.resourceId.videoId}
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
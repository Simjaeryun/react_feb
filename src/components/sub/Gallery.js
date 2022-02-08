import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Gallery() {
    const api_key = "f7cfb698e2ac45b786af0b554ec7cd09";
    const method1 = "flickr.interestingness.getList";
    const num = 5;
    const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`

    const main = useRef(null);

    const [items, setItems] = useState([]);
    useEffect(() => {
        main.current.classList.add("on");
        axios.get(url)
            .then((data) => {
                const photo = data.data.photos.photo
                console.log(photo)
                setItems(photo)
            })
    }, [])
    return (
        <main className="content gallery" ref={main}>
            <figure>
            </figure>
            <div className="inner">
                <h1>Gallery</h1>
                <section>
                    {items.map((data, idx) => {
                        const imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`
                        return (
                            <article key={idx}>
                                <div className="inner">
                                    <div className="pic">
                                        <img src={imgSrc} alt="flickr에서 가져온 이미지" />
                                    </div>
                                    <h2>
                                        {data.title}
                                    </h2>
                                </div>

                            </article>
                        )
                    })}
                </section>
            </div>
        </main>
    )
}
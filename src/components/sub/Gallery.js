import { useEffect, useRef } from "react";

export default function Gallery() {
    const main = useRef(null);
    useEffect(() => {
        main.current.classList.add("on");
    }, [])
    return (
        <main className="content gallery" ref={main}>
            <figure>
            </figure>
            <div className="inner">
                <h1>Gallery</h1>
                <section></section>
            </div>
        </main>
    )
}
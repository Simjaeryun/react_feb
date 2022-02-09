import { useEffect, useRef, useState } from "react";
export default function Location() {
    const main = useRef(null);
    const { kakao } = window;
    const container = useRef(null)
    const [map, setMap] = useState(null);
    useEffect(() => {
        main.current.classList.add("on");
        const options = {
            center: new kakao.maps.LatLng(37.61332727624326, 126.73032735681633),
            level: 3
        }
        new kakao.maps.Map(container.current, options)

        const map = new kakao.maps.Map(container.current, options)
        setMap(map)
    }, [])
    return (
        <main className="content location" ref={main}>
            <figure>
            </figure>
            <div className="inner">
                <h1>Location</h1>
                <section>
                    <div id="map" ref={container}></div>
                    <button onClick={() => {
                        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                    }}>교통정보보기</button>
                    <button onClick={() => {
                        map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                    }}>교통정보닫기</button>
                </section>
            </div>
        </main>
    )
}
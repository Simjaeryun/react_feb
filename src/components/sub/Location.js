import { useEffect, useRef, useState } from "react";

export default function Location() {
    const main = useRef(null);
    const traffic = useRef(null);
    const branch = useRef([]);
    const { kakao } = window;
    const container = useRef(null);
    const [map, setMap] = useState(null);
    const [index, setIndex] = useState(0);
    const [click, setClick] = useState(false);
    const path = process.env.PUBLIC_URL;
    const info = [
        {
            title: "강남",
            latlng: new kakao.maps.LatLng(37.50711796614849, 126.7564159502457),
            imgSrc: path + '/img/marker1.png',
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(116, 99) },
        },
        {
            title: "제주도",
            latlng: new kakao.maps.LatLng(33.450701, 126.570667),
            imgSrc: path + '/img/marker2.png',
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(116, 99) },
        },
        {
            title: "부산",
            latlng: new kakao.maps.LatLng(37.557527, 126.9222836),
            imgSrc: path + '/img/marker3.png',
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(116, 99) },
        }
    ];
    const [mapInfo] = useState(info);

    useEffect(() => {
        main.current.classList.add('on');
    }, []);

    useEffect(() => {
        container.current.innerHTML = '';

        const options = {
            center: mapInfo[0].latlng,
            level: 3
        }

        const map = new kakao.maps.Map(container.current, options);
        setMap(map);

        new kakao.maps.Marker({
            map: map,
            position: mapInfo[index].latlng,
            title: mapInfo[index].title,
            image: new kakao.maps.MarkerImage(mapInfo[index].imgSrc, mapInfo[index].imgSize, mapInfo[index].imgPos)
        })

        map.setCenter(mapInfo[index].latlng);

        const mapSet = () => map.setCenter(mapInfo[index].latlng);

        const mapType = new kakao.maps.MapTypeControl();
        map.addControl(mapType, kakao.maps.ControlPosition.TOPRIGHT)

        map.setZoomable(false)


        window.addEventListener('resize', mapSet);

        return () => window.removeEventListener('resize', mapSet);
    }, [index]);

    const handleTrafficClick = () => {
        if (!traffic.current.classList.contains("on")) {
            map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
            traffic.current.innerText = "교통정보 끄기"
            traffic.current.classList.add("on")
        }
        else {
            map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
            traffic.current.innerText = "교통정보 보기"
            traffic.current.classList.remove("on")
        }
    }


    return (
        <main className="content location" ref={main}>
            <figure>
                <img src={`${path}/img/location.jpg`} alt="" />
                <h1>Location</h1>
            </figure>
            <div className="inner">
                <section>
                    <div id="map" ref={container}></div>
                    <div className="btns">
                        <nav className='traffic'>
                            <button onClick={handleTrafficClick} ref={traffic}>교통정보 보기</button>
                        </nav>

                        <nav className="branch">
                            {mapInfo.map((data, idx) => {
                                return <button
                                    ref={branch}
                                    key={idx}
                                    onClick={(e) => {
                                        setIndex(idx)
                                        const a = Array.from(e.target.parentNode.childNodes)
                                        for (const el of a) {
                                            el.classList.remove("on")
                                        }
                                        e.target.classList.add("on")
                                    }}> {data.title}</button>
                            })}
                        </nav>
                    </div>

                </section>
            </div >
        </main >
    )
}
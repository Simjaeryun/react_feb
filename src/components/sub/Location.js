import { useEffect, useRef, useState } from "react";

export default function Location() {
    const main = useRef(null);
    const location = useRef([]);
    const { kakao } = window;
    const container = useRef(null);

    const [index, setIndex] = useState(0);
    const path = process.env.PUBLIC_URL;
    const info = [
        {
            title: "GANGNAM",
            latlng: new kakao.maps.LatLng(37.50711796614849, 126.7564159502457),
            imgSrc: path + '/img/marker1.png',
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(116, 99) },
            mapImg: `/img/location_map1.jpg`,
            des: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eaque, aspernatur?",
            time: "18:00"
        },
        {
            title: "JEJU",
            latlng: new kakao.maps.LatLng(33.450701, 126.570667),
            imgSrc: path + '/img/marker2.png',
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(116, 99) },
            mapImg: `/img/location_map2.jpg`,
            des: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eaque, aspernatur?",
            time: "20:00"
        },
        {
            title: "BUSAN",
            latlng: new kakao.maps.LatLng(37.557527, 126.9222836),
            imgSrc: path + '/img/marker3.png',
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(116, 99) },
            mapImg: `/img/location_map3.jpg`,
            des: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eaque, aspernatur?",
            time: "22:00"
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


    return (
        <main className="content location" ref={main}>

            <section>
                <div id="map" ref={container}></div>
                <div className="location_content">
                    <h2>FIND<br /> A <br />BOUTIQUE</h2>
                    {mapInfo.map((data, idx) => {
                        return (
                            <div className="location_pic_box" key={idx}>
                                <div className="location_pic">
                                    <img
                                        src={`${path}${data.mapImg}`}
                                        alt=""
                                        ref={location}
                                        onClick={(e) => {
                                            setIndex(idx)
                                            const a = Array.from(e.target.parentNode.childNodes)
                                            for (const el of a) {
                                                el.classList.remove("on")
                                            }
                                            e.target.classList.add("on")
                                        }}
                                    />
                                </div>
                                <div className="location_pic_txt">
                                    <h3>{data.title}</h3>
                                    <p>{data.des}</p>
                                    <span>CLOSE {data.time}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

        </main >
    )
}
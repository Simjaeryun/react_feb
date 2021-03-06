import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setYoutube } from "../../redux/actions";

export default function Videos() {
    const vidData = useSelector(state => state.youtubeReducer.youtube);
    const dispatch = useDispatch();

    const key = "AIzaSyDTqpCGvBZz_l-UfWUkSY-UWyzxgO58z2I";
    const playListId = "PLsGbxh85lJXKe7TgZX4e2nqkewL1urGyf";
    const num = 30;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;

    const [isPop, setIsPop] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetchYoutube();
    }, []);

    const fetchYoutube = async () => {
        await axios.get(url).then(json => {
            dispatch(setYoutube(json.data.items));
        });
    }
    return (
        <>
            <section className="videos">
                <div className="inner" >
                    <div className="videos_main">
                        {vidData.map((_, idx) => {
                            let tit = vidData[idx].snippet.title;
                            let tit_len = tit.length;
                            let desc = vidData[idx].snippet.description;
                            let desc_len = desc.length;
                            return (
                                idx === 4
                                    ?
                                    <div key={idx}>
                                        <div className="videos_main_video" onClick={() => {
                                            setIsPop(true);
                                            setIndex(idx);
                                        }}>
                                            <img
                                                src={vidData[idx].snippet.thumbnails.maxres.url} alt=""
                                            />
                                        </div>
                                        <div className="videos_main_txt">
                                            <h1 className="videos_main_title">
                                                {tit_len > 40 ? tit.substr(0, 40) + ".." : tit}
                                            </h1>
                                            <p className="videos_main_description">
                                                {desc_len > 200 ? desc.substr(0, 200) + "..." : desc}
                                            </p>
                                        </div>
                                    </div>
                                    : null
                            )
                        })}
                    </div>
                    <ul className="videos_sub">
                        {vidData.map((vid, idx) => {
                            let tit = vid.snippet.title;
                            let tit_len = tit.length;
                            let desc = vid.snippet.description;
                            let desc_len = desc.length;
                            return (
                                idx < 4
                                    ?
                                    <li className="videos_sub_card" key={idx}>
                                        <div className="videos_sub_video" onClick={() => {
                                            setIsPop(true);
                                            setIndex(idx);
                                        }}>
                                            <img src={vid.snippet.thumbnails.standard.url} alt="" />
                                        </div>
                                        <div className="videos_sub_txt">
                                            <div className="videos_sub_txt-title">
                                                {tit_len > 14 ? tit.substr(0, 14) + ".." : tit}
                                            </div>
                                            <div className="videos_sub_txt-description">
                                                {desc_len > 50 ? desc.substr(0, 50) + "..." : desc}
                                            </div>
                                        </div>
                                    </li>
                                    : null
                            )
                        })}

                    </ul>
                </div>
            </section>
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
                    src={"https://www.youtube.com/embed/" + vidData[index].snippet.resourceId.videoId}
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
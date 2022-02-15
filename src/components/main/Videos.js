import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setYoutube } from "../../redux/actions";

export default function Videos() {
    //useSelector로 youtubeReducer에 있는 초기 빈 배열을 가져옴
    const vidData = useSelector(state => state.youtubeReducer.youtube);
    const dispatch = useDispatch();

    const key = "AIzaSyDTqpCGvBZz_l-UfWUkSY-UWyzxgO58z2I";
    const playListId = "PLsGbxh85lJXJyWJZ07m7tRiDPqQJNAlZL";
    const num = 5;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResult=${num}`;

    //axios로 받아온 youtube data를 dispatch로 reducer에 전달 
    const fetchYoutube = async () => {
        await axios.get(url).then(json => {
            dispatch(setYoutube(json.data.items));
            console.log(json.data.items)
        });
    }

    useEffect(() => {
        fetchYoutube();
        console.log(vidData);
    }, []);

    return (
        <section className="videos">
            <div className="inner">
                <div className="videos_main">
                    <div className="videos_main_video">
                        s
                    </div>
                    <h1 className="videos_main_title">mainvideo</h1>
                    <p className="videos_main_description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius illum omnis velit.
                    </p>
                </div>
                <ul className="videos_sub">
                    {vidData.map((vid, idx) => {
                        let tit = vid.snippet.title;
                        let tit_len = tit.length;
                        let desc = vid.snippet.description;
                        let desc_len = desc.length;

                        if (idx < 4)
                            return (
                                <li className="videos_sub_card" key={idx}>
                                    <div className="videos_sub_video">
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
                            )
                    })}

                </ul>
            </div>
        </section>
    )
} 
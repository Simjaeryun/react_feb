import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setFlicker } from "../../redux/actions"

export default function Photos() {

    const photoData = useSelector(state => state.flickerReducer.flicker);
    const dispatch = useDispatch();

    const getFlickr = async () => {
        const api_key = "f7cfb698e2ac45b786af0b554ec7cd09";
        const method = 'flickr.interestingness.getList';
        const num = 200;
        let url = `https://www.flickr.com/services/rest/?method=${method}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;

        await axios.get(url).then(json => {
            dispatch(setFlicker(json.data.photos.photo))
            console.log(photoData)
        })

    }



    useEffect(() => {
        getFlickr()
    }, [])

    return (
        <section className="photos">
            <div className="inner">
                <div className="wrap">
                    <div className="photos_txt_box">
                        <h1>PHOTO GALLERY</h1>
                        <p>
                            Ceremonies, Pink carpet, Screenings,<br />
                            Rendez-vous, Photocalls... find all the <br />
                            events and people who turned<br />
                            CANNESERIES into a great and <br />
                            unforgettable moment in pictures!
                        </p>
                        <button>
                            SEE THE ALBUMS
                        </button>
                    </div>
                    <div className="photos_img_box">
                        {photoData.map((photo, idx) => {
                            return (
                                idx < 4
                                    ?
                                    <div className="photos_img" key={idx}>
                                        <img src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`} alt="" />
                                    </div>
                                    : null
                            )
                        })}

                    </div>
                </div>
            </div>
        </section>
    )
}
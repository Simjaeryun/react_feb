import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setFlicker } from "../../redux/actions"

export default function Photos() {

    const photoData = useSelector(state => state.flickerReducer.flicker);
    const dispatch = useDispatch();
    const api_key = "f7cfb698e2ac45b786af0b554ec7cd09";
    const method1 = 'flickr.interestingness.getList';

    let url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=4&api_key=${api_key}&format=json&nojsoncallback=1`;

    const fetchFlicker = async () => {
        await axios.get(url).then(json => {
            dispatch(setFlicker(json.data.photos.photo))
            console.log(photoData)
        })
    }

    useEffect(() => {
        fetchFlicker()
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
                                <div className="photos_img" key={idx}>
                                    <img src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`} alt="" />
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </section>
    )
}
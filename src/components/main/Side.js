import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub, faGoogle, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

export default function Side() {
    return (
        <aside className="side">
            <h1 className="side_logo">
                SEASON 05
            </h1>
            <ul className="side_icon_box">
                <li className="side_icon">
                    <a
                        href='https://github.com/Simjaeryun'
                        target={"_blank"}
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </li>
                <li className="side_icon">
                    <a
                        href='https://www.facebook.com/'
                        target={"_blank"}
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                </li>
                <li className="side_icon">
                    <a
                        href='https://www.instagram.com/'
                        target={"_blank"}
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </li>
                <li className="side_icon">
                    <a
                        href='https://www.twitter.com/'
                        target={"_blank"}
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                </li>

                <li className="side_icon">
                    <a
                        href='https://www.google.com'
                        target={"_blank"}
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                </li>

            </ul>
        </aside>
    )
}
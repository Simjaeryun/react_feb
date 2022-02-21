import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { useEffect } from "react";

export default function Header(props) {
    const [isOn, setIsOn] = useState(false);
    const toggleNav = () => setIsOn(!isOn);
    const closeNav = () => window.innerWidth > 1200 && setIsOn(false)

    useEffect(() => {
        window.addEventListener("resize", closeNav)
        return () => window.removeEventListener("resize", closeNav);
    })
    return (
        <>
            <header className={props.type}>
                <div className="inner">
                    <h1><NavLink exact to="/">MAGAZINE</NavLink></h1>
                    <Gnb />
                    <FontAwesomeIcon icon={faBars} onClick={toggleNav} />
                </div>
            </header>
        </>
    )
}


function Gnb() {
    const active = { color: "rgb(179, 25, 25)" };
    return (
        <ul id="gnb">
            <li><NavLink activeStyle={active} to="/about">ABOUT</NavLink></li>
            <li><NavLink activeStyle={active} to="/qna">Q&A</NavLink></li>
            <li><NavLink activeStyle={active} to="/gallery">GALLERY</NavLink></li>
            <li><NavLink activeStyle={active} to="/youtube">VIDEOS</NavLink></li>
            <li><NavLink activeStyle={active} to="/location">LOCATION</NavLink></li>
            <li><NavLink activeStyle={active} to="/join">JOIN</NavLink></li>
        </ul>
    )
}

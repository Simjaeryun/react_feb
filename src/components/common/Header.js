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
                    <h1><NavLink exact to="/">LOGO</NavLink></h1>
                    <Gnb />
                    <FontAwesomeIcon icon={faBars} onClick={toggleNav} />
                </div>
            </header>
        </>
    )
}


function Gnb() {
    const active = { color: "aqua" };
    return (
        <ul id="gnb">
            <li><NavLink activeStyle={active} to="/department">Department</NavLink></li>
            <li><NavLink activeStyle={active} to="/qna">Q&A</NavLink></li>
            <li><NavLink activeStyle={active} to="/gallery">Gallery</NavLink></li>
            <li><NavLink activeStyle={active} to="/youtube">Youtube</NavLink></li>
            <li><NavLink activeStyle={active} to="/location">Location</NavLink></li>
            <li><NavLink activeStyle={active} to="/join">Join</NavLink></li>
        </ul>
    )
}

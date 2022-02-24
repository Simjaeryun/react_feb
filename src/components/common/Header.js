import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react';
import GnbBtns from "./commonComponents/GnbBtns";
export default function Header(props) {
    const mobileNav = useRef(null)
    const [isOn, setIsOn] = useState(true)




    useEffect(() => {
        window.addEventListener("resize", (e) => {
            if (e.target.innerWidth >= 1001) {
                setIsOn(false)
            }
        })
    }, [mobileNav])
    return (
        <>
            <header className={props.type}>
                <div
                    className={isOn ? "inner on" : "inner"}
                    ref={mobileNav}
                >
                    <h1><NavLink exact to="/">MAGAZINE</NavLink></h1>
                    <Gnb />
                </div>
                <FontAwesomeIcon
                    icon={faBars}
                    onClick={() => {
                        if (isOn) {
                            setIsOn(false)
                        } else {
                            setIsOn(true)
                        }
                    }}
                />
            </header>
        </>
    )
}


function Gnb() {

    return (
        <ul id="gnb">
            <GnbBtns name={"About"} link={"/about"} />
            <GnbBtns name={"Q&A"} link={"/qna"} />
            <GnbBtns name={"GALLERY"} link={"/gallery"} />
            <GnbBtns name={"VIDEOS"} link={"/youtube"} />
            <GnbBtns name={"LOCATION"} link={"/location"} />
            <GnbBtns name={"JOIN"} link={"/join"} />
        </ul>

    )
}

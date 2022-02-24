import { NavLink } from "react-router-dom";
export default function GnbBtns(props) {
    const active = { color: "rgb(179, 25, 25)" };
    return (
        <li>
            <NavLink
                activeStyle={active}
                to={props.link}
            >
                {props.name}
            </NavLink>
        </li>
    )
}
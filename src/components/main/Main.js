import Header from "../common/Header";
import Visual from "./Visual";
import Intro from "./Intro";
import Info from "./Info";

export default function Main() {
    return (
        <>
            <Header type={"main"} />
            <Visual />
            <Intro />
            <Info />
        </>
    )
}
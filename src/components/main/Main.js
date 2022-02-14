import Header from '../common/Header';
import Visual from './Visual';
import Intro from './Intro';
import News from './News';
import Side from './Side';
import Highlight from './Highlight';
import Videos from './Videos';
import Info from './info';
import Btns from './Btns';

import Anime from "../../class/anime.js";
import { useEffect, useRef, useState } from 'react';

export default function Main() {
    const main = useRef(null);
    const pos = useRef([]);

    const [index, setIndex] = useState(0);

    const getIndex = index => {
        setIndex(index);
    }

    const getPos = () => {
        const sections = main.current.querySelectorAll('.myScroll');
        let arr = [];
        for (const sec of sections) {
            arr.push(sec.offsetTop);
        }
        pos.current = arr;
    }

    useEffect(() => {
        getPos();
        window.addEventListener("resize", getPos);
        return () => {
            window.removeEventListener("resize", getPos)
        }
    }, [])

    useEffect(() => {
        new Anime(window, {
            prop: 'scroll',
            value: pos.current[index],
            duration: 500
        })
    }, [index])
    return (
        <div id="mainWrap" ref={main}>
            <Header type={'main_header'} />
            <Side />
            <Visual />
            <Highlight />
            <Videos />
            <Intro />
            <News />
            <Info />
            <Btns getIndex={getIndex} />
        </div>
    )
}
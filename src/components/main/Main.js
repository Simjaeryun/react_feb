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
        const sections = main.current.querySelectorAll('section');
        let arr = [];
        for (const sec of sections) {
            arr.push(sec.offsetTop);
        }
        pos.current = arr;
    }

    const activation = () => {
        const base = 200;
        let scroll = window.scrollY;
        const btns = main.current.querySelectorAll("#btns li");

        pos.current.map((pos, idx) => {
            if (scroll >= pos) {
                for (const btn of btns) btn.classList.remove("on");
                btns[idx].classList.add("on");
            }
        })
    }


    useEffect(() => {
        getPos();
        window.addEventListener("resize", getPos);
        window.addEventListener("scroll", activation)
        return () => {
            window.removeEventListener("resize", getPos)
            window.removeEventListener("scroll", activation)
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
            <Btns getIndex={getIndex} index={index} />
        </div>
    )
}
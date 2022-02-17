import Anime from "../../class/anime";
import Header from '../common/Header';
import Visual from './Visual';
import Intro from './Intro';
import News from './News';
import Side from './Side';
import Highlight from './Highlight';
import Videos from './Videos';
import Info from './info';

import { useRef, useState, useEffect } from 'react';
import Photos from './Photos';



export default function Main() {
    const main = useRef(null);
    //현재 스크롤되는 값을 관리할 state생성
    const [scrolled, setScrolled] = useState(0);
    const activation = () => {
        //브라우저가 스크롤될때마다 scrolled 값 변경\
        setScrolled(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', activation);
        return () => {
            window.removeEventListener('scroll', activation);
        }
    }, []);

    useEffect(() => {
        new Anime(window, {
            prop: 'scroll',
            value: scrolled,
            duration: 500
        })
    }, [])

    return (
        <div id="mainWrap" ref={main} >
            <Header type={'main_header'} />
            <Side />
            <Visual />
            <Highlight scrolled={scrolled} />
            <Videos />
            <Photos />
            <Intro />
            <News />
            <Info />
        </div>
    )
}
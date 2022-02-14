import Header from '../common/Header';
import Visual from './Visual';
import Intro from './Intro';
import News from './News';
import Side from './Side';
import Highlight from './Highlight';
import Videos from './Videos';
import Info from './info';

import { useRef, } from 'react';



export default function Main() {
    const main = useRef(null);


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
        </div>
    )
}
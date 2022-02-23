import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Side from './Side';
import Highlight from './Highlight';
import Videos from './Videos';

import { useRef, } from 'react';
import Photos from './Photos';
import Member from './Member';



export default function Main() {
    const main = useRef(null);


    return (
        <div id="mainWrap" ref={main} >
            <Header type={'main_header'} />
            <Side />
            <Visual />
            <Highlight />
            <Videos />
            <Photos />
            <Member />
            <News />
        </div>
    )
}
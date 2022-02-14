import Header from '../common/Header';
import Visual from './Visual';
import Intro from './Intro';
import News from './News';
import Side from './Side';
import Highlight from './Highlight';
import Videos from './Videos';
import Info from './info';
import Btns from './Btns';
export default function Main() {

    return (
        <>
            <Header type={'main_header'} />
            <Side />
            <Visual />
            <Highlight />
            <Videos />
            <Intro />
            <News />
            <Info />
            <Btns />
        </>
    )
}
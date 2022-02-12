import Header from '../common/Header';
import Visual from './Visual';
import Intro from './Intro';
import News from './News';
import Side from './Side';
export default function Main() {

    return (
        <>
            <Header type={'main'} />
            <Side />
            <Visual />
            <Intro />
            <News />
        </>
    )
}
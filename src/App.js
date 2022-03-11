//공통 component
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

//main
import Main from "./components/main/Main";

//sub
import About from "./components/sub/About";
import Qna from "./components/sub/Qna";
import Gallery from "./components/sub/Gallery";
import Youtube from "./components/sub/Youtube";
import Location from "./components/sub/Location";
import Join from "./components/sub/Join";
import { Route, Switch } from 'react-router-dom';

import './scss/style.scss';
import 'animate.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';




function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main}>
        </Route>

        <Route path="/">
          <Header type={"sub_header"} />

        </Route>
      </Switch>


      <Route path="/about" component={About}></Route>
      <Route path="/qna" component={Qna}></Route>
      <Route path="/gallery" component={Gallery}></Route>
      <Route path="/youtube" component={Youtube}></Route>
      <Route path="/location" component={Location}></Route>
      <Route path="/join" component={Join}></Route>

      <Footer />
    </div >
  );
}


export default App;

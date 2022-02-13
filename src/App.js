//공통 component
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

//main
import Main from "./components/main/Main";

//sub
import Department from "./components/sub/Department";
import Qna from "./components/sub/Qna";
import Gallery from "./components/sub/Gallery";
import Youtube from "./components/sub/Youtube";
import Location from "./components/sub/Location";
import Join from "./components/sub/Join";
import { Route, Switch } from 'react-router-dom';

import './scss/style.scss'



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


      <Route path="/department" component={Department}></Route>
      <Route path="/qna" component={Qna}></Route>
      <Route path="/gallery" component={Gallery}></Route>
      <Route path="/youtube" component={Youtube}></Route>
      <Route path="/location" component={Location}></Route>
      <Route path="/join" component={Join}></Route>


      <Footer />
    </div >
  );
}

/*
  각 라우터를 Switch 컴포넌트로 감싸놓으면
  중첩되는 경로가 있을때 상단에 있는 경로만 적용한다. 
  Switch를 활용할때는 중첩되는 url경로중 디테일한 요소를 보통 위쪽에 배치해서
  route를 세분화
*/


export default App;

import { createStore } from "redux";
import reducers from "./reducers";

//store를 생성시 reducer로 전달된 값을 적용
const store = createStore(reducers);
export default store
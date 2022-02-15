import { combineReducers } from "redux";

//초기에 적용될 상태값
const initMember = {
    members: [
        {
            "data": [
                {
                    "name": "Emma",
                    "position": "CEO",
                    "pic": "member1.jpg"
                },
                {
                    "name": "Paul",
                    "position": "Front-End Developer",
                    "pic": "member2.jpg"
                },
                {
                    "name": "Julia",
                    "position": "UI/UX Designer",
                    "pic": "member3.jpg"
                },
            ]
        }
    ]
}

//initMember를 초기값으로 지정해 객체 정보값을 반환하는 reducer함수 정의
//이때 두번째 인자인 action객체로부터 type(액션이름)과 payload(자식컴포넌트에서 전달받을값)을 받음
const departmentReducer = (state = initMember, action) => {
    switch (action.type) {
        //추후 자식 컴포넌트에서 호출한 action.type에 따라 해당 reducer의
        // 값 변경 가능
        case 'SET_MEMBERS':
            return { ...state, members: action.payload }
        default:
            return state
    }

}

const reducers = combineReducers({
    departmentReducer,
})

export default reducers
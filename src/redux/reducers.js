import { combineReducers } from "redux";

//초기에 적용될 상태값
const initMember = {
    members: [
        {
            "name": "Julia",
            "position": "CEO",
            "pic": "member1.jpg"
        },
        {
            "name": "Paul",
            "position": "Vice President",
            "pic": "member2.jpg"
        },
        {
            "name": "Peter",
            "position": "Engineer",
            "pic": "member3.jpg"
        }
    ]
}

//inintMember를 초기값으로 지정해서 객체정보값을 반환하는 reducer함수 정의
//이때 두번쨰 인수인 action객체로부터 type(액션이름)과 payload(자식컴포넌트에서 전달받을 값)을 받음
const departmentReducer = (state = initMember, action) => {
    switch (action.type) {
        //추후 자식 컴포넌트에서 호출한 action.type에 따라 해당 reducer의 값 변경 가능
        case 'SET_MEMBERS':
            return { ...state, members: action.payload }

        default:
            return state;
    }
}

//여러개의 reducer들을 하나로 합쳐서 반환
const reducers = combineReducers({
    departmentReducer
})

export default reducers;
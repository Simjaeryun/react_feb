import { useEffect, useRef, useState } from "react";

export default function Community() {
    const main = useRef(null);
    let [index, setIndex] = useState(0);
    useEffect(() => {
        main.current.classList.add("on");
    }, [])
    useEffect(() => {
        console.log("index값 변경됨");
    }, [index])
    return (
        <main className="content community" ref={main}>
            <figure>
            </figure>
            <div className="inner">
                <h1>Community</h1>
                <section>
                    <button onClick={() => setIndex(--index)}>-</button>
                    <button onClick={() => setIndex(++index)}>+</button>
                    <h2>{index}</h2>
                </section>
            </div>
        </main >
    )
}


/*
    useEffect : 해당 컴포넌트의 생성, 상태값변경, 소멸이라는 생명 주기에 따라 특정 구문을 실행 할 수 있는 훅
    -- useEffect는 첫번째 인수로 콜백함수 등록
    -- useEffect는 두번째 인수로 의존성을 등록
    -- useEffect는 두번째 인수로 빈 배열을 의존성으로 등록 : 해당 컴포넌트가  처음 생성될 때 한번만 호출 가능.
    */
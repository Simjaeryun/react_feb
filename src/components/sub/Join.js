import { useEffect, useRef, useState } from "react";

export default function Join() {
    const main = useRef(null);
    const initVal = {
        userid: '',
    }
    //변수 initVal 은 userid : '' 라는 key와 value값이있는 객체.
    const [val, setVal] = useState(initVal);
    // val 기본값으로 initVal을 가진다.
    const [err, setErr] = useState({});
    // err 기본값으로 빈 객체를 가진다.

    //handleChange 실행 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        //e.target = input이고 input에 name과 value를 배열에 담음
        setVal({ ...val, [name]: value })
        //useState 기존 값 val을 그대로 복사해주고 [name] : value를 담아준다
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //submit event를 막는다
        setErr(check(val));
        //err에 check(val)함수의 결과값을 담음
    }

    const check = val => {
        let errs = {}
        //errs 는 빈객체이다. 
        if (!val.userid || val.userid.length < 5) {
            //만약 userid가 존재하지않거나 5글자 보다 적다면
            errs.userid = 'id를 5글자 이상 입력하세요';
            //errs 빈객체에 string을 담는다
        }
        return errs;
        //return을 이용해 errs를 내보낸다.
    }

    useEffect(() => {
        main.current.classList.add("on");
    }, [])
    //page가 시작할 때 처음 한번만 main에 on class를 추가한다.

    useEffect(() => {
        console.log(err);
        //err의 값이 변경될 때 마다 콘솔에 err을 보여준다.

    }, [err])


    return (
        <main className="content join" ref={main}>
            <figure>
            </figure>
            <div className="inner">
                <h1>Join</h1>
                <section>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>회원가입 폼 양식</legend>

                            <table>
                                <caption>회원가입 입력</caption>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="userid">USER ID</label>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                name="userid"
                                                id="userid"
                                                placeholder="아이디를 입력하세요"
                                                value={val.userid}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colSpan='2'>
                                            <input type="reset" value='CANCLE' />
                                            <input
                                                type="submit"
                                                value="SEND"
                                            />
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </fieldset>
                    </form>
                </section>
            </div>
        </main>
    )
}
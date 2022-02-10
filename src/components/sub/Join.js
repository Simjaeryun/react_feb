import { useEffect, useRef, useState } from "react";

export default function Join() {
    const main = useRef(null);
    const initVal = {
        userid: '',
        email: '',
    }
    const [val, setVal] = useState(initVal);
    const [err, setErr] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVal({ ...val, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErr(check(val));
    }

    const check = val => {
        let errs = {}
        if (val.userid.length < 5) {
            errs.userid = 'id를 5글자 이상 입력하세요';
        }
        if (val.email.length < 8) {
            errs.email = 'email을 5글자 이상 입력하세요'
        }
        return errs;
    }

    useEffect(() => {
        main.current.classList.add("on");

    }, [])

    useEffect(() => {

        const len = Object.keys(err).length;

        console.log(len)
        if (len === 0) {
            console.log("모든 인풋요소 인증 통과")
        } else {
            console.log(err);
        }
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
                                        <th>
                                            <label htmlFor="email">E-mail</label>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                placeholder="이메일 주소를 입력하세요"
                                                value={val.email}
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
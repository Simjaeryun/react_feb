import { useEffect, useRef, useState } from "react";

export default function Join() {
    const main = useRef(null);
    const initVal = {
        userid: '',
        pwd1: '',
        pwd2: '',
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
        const eng = /[a-zA-Z]/;
        const num = /[0-9]/;
        const spc = /[~!@#$%^&*()_+-\]\[]/;
        if (val.userid.length < 5) {
            errs.userid = 'id를 5글자 이상 입력하세요';
        }
        if (val.email.length < 8 || !/@/.test(val.email)) {
            errs.email = 'email을 8글자 이상  @를 포함하세요'
        }
        if (val.pwd1.length < 6 || !eng.test(val.pwd1) || !num.test(val.pwd1) || !spc.test(val.pwd1)) {
            errs.pwd1 = '비밀번호는 5글자 이상 문자, 숫자, 특수문자를 포함하세요'
        }

        if (val.pwd1 !== val.pwd2) {
            errs.pwd2 = "두개의 비밀번호를 동일하게 입력하세요"
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
                                    {/* User ID */}
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
                                    {/* Password */}
                                    <tr>
                                        <th>
                                            <label htmlFor="pwd1">password</label>
                                        </th>
                                        <td>
                                            <input
                                                type="password"
                                                id="pwd1"
                                                name="pwd1"
                                                placeholder="비밀번호를 입력하세요"
                                                value={val.pwd1}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                    {/* Re Password */}
                                    <tr>
                                        <th>
                                            <label htmlFor="pwd2">Re Password</label>
                                        </th>
                                        <td>
                                            <input
                                                type="password"
                                                id="pwd2"
                                                name="pwd2"
                                                placeholder="비밀번호를 입력하세요"
                                                value={val.pwd2}
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
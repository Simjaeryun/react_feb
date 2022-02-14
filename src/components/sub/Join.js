import { useEffect, useRef, useState } from "react";

export default function Join() {
    const path = process.env.PUBLIC_URL;
    const main = useRef(null);
    const initVal = {
        userid: '',
        pwd1: '',
        pwd2: '',
        email: '',

        gender: false,
        edu: false,
    }
    const [val, setVal] = useState(initVal);
    const [err, setErr] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [success, setSucess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVal({ ...val, [name]: value })
    }
    const handleRadio = e => {
        const { name } = e.target;
        const isCheck = e.target.checked;
        setVal({ ...val, [name]: isCheck });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        setErr(check(val));
    }

    const handleSelect = (e) => {
        const { name } = e.target;
        const isSelected = e.target.options[e.target.selectedIndex].value
        setVal({ ...val, [name]: isSelected })
    }

    const handleReset = (e) => {
        setVal(initVal);
        setErr({});
        setIsSubmit(false);
    }

    const check = val => {
        let errs = {}
        const eng = /[a-zA-Z]/;
        const num = /[0-9]/;
        const spc = /[~!@#$%^&*()_+-\][]/;
        if (val.userid.length < 5) {
            errs.userid = 'id를 5글자 이상 입력하세요';
        }
        if (val.email.length < 8 || !/@/.test(val.email)) {
            errs.email = 'email을 8글자 이상  @를 포함하세요'
        }
        if (val.pwd1.length < 6 || !eng.test(val.pwd1) || !num.test(val.pwd1) || !spc.test(val.pwd1)) {
            errs.pwd1 = '비밀번호는 5글자 이상 문자, 숫자, 특수문자를 포함하세요'
        }

        if (val.pwd1 !== val.pwd2 || val.pwd2.length === 0) {
            errs.pwd2 = "두개의 비밀번호를 동일하게 입력하세요"
        }
        if (!val.gender) {
            errs.gender = '성별을 선택하세요'
        }
        if (!val.edu) {
            errs.edu = '학력을 선택해주세요'
        }
        return errs;
    }

    useEffect(() => {
        main.current.classList.add("on");

    }, [])

    useEffect(() => {

        const len = Object.keys(err).length;

        if (len === 0 && isSubmit) {
            setSucess(true);
        } else {
            setSucess(false);
        }
    }, [err, isSubmit])


    return (
        <main className="content join" ref={main}>
            <figure>
            </figure>
            <div className="inner">
                <h1>Join</h1>
                <section>
                    {success ? <div className="success">회원가입을 축하합니다.</div> : null}
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className="h">회원가입 폼 양식</legend>

                            {/* User ID */}
                            <div className="form_input">
                                <input
                                    type="text"
                                    name="userid"
                                    id="userid"
                                    placeholder="user id"
                                    value={val.userid}
                                    onChange={handleChange}
                                />
                                <span className="err">{err.userid}</span>
                            </div>
                            {/* Password */}
                            <div className="form_input">
                                <input
                                    type="password"
                                    id="pwd1"
                                    name="pwd1"
                                    placeholder="Password"
                                    value={val.pwd1}
                                    onChange={handleChange}
                                />
                                <span className="err">{err.pwd1}</span>
                            </div>
                            {/* Re Password */}
                            <div className="form_input">
                                <input
                                    type="password"
                                    id="pwd2"
                                    name="pwd2"
                                    placeholder="Re Password"
                                    value={val.pwd2}
                                    onChange={handleChange}
                                />
                                <span className="err">{err.pwd2}</span>
                            </div>
                            {/* Email */}
                            <div className="form_input">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={val.email}
                                    onChange={handleChange}
                                />
                                <span className="err">{err.email}</span>
                            </div>
                            {/* edu */}
                            <div className="form_input">
                                <label htmlFor="edu">Education</label>
                                <select name="edu" id="edu" onChange={handleSelect}>
                                    <option value="">학력을 선택하세요</option>
                                    <option value="elementary-school">초등학교 졸업</option>
                                    <option value="middle-school">중학교 졸업</option>
                                    <option value="high-school">고등학교 졸업</option>
                                    <option value="college">대학교 졸업</option>
                                </select>
                                <span className="err">{err.edu}</span>
                            </div>
                            {/* Gender */}
                            <div className="form_input">
                                <h2>Gender</h2>
                                <div className="gender_input">
                                    <label htmlFor="male">Male</label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        onChange={handleRadio}
                                    />
                                    <label htmlFor="female">Female</label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        onChange={handleRadio}
                                    />
                                </div>


                                <span className="err">{err.gender}</span>

                            </div>

                            {/* Button */}
                            <div className="form_input">
                                <div className="btnSet">
                                    <input
                                        type="reset"
                                        value='CANCLE'
                                        onClick={handleReset}
                                    />
                                    <input
                                        type="submit"
                                        value="SEND"
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </form>
                    <article className="form_img">
                        <img src={`${path}/img/security2.png`} alt="" />
                    </article>
                </section>
            </div>
        </main>
    )
}
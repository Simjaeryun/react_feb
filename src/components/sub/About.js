import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMembers } from "../../redux/actions";


export default function About() {
    const main = useRef(null);
    const members = useSelector(state => state.aboutReducer.members)
    const dispatch = useDispatch();
    const newMember = [
        {
            "name": "Julia",
            "position": "CEO",
            "pic": "member4.jpg"
        },
        {
            "name": "Paul",
            "position": "Vice President",
            "pic": "member5.jpg"
        },
        {
            "name": "Peter",
            "position": "Engineer",
            "pic": "member6.jpg"
        }]
    const path = process.env.PUBLIC_URL;

    useEffect(() => {
        main.current.classList.add("on");
    }, [])

    return (
        <main className="content about" ref={main}>
            <figure>
                <img src={`${path}/img/about.jpg`} alt="" />
                <h1>ABOUT</h1>
            </figure>
            <div className="inner">

                <button onClick={() => {
                    dispatch(setMembers(newMember))
                }} >멤버변경</button>
                <section>
                    {members.map((member, idx) => {
                        return (
                            <article key={idx}>
                                <img src={`${path}/img/${member.pic}`} alt="profile사진" />
                                <h2>{member.name}</h2>
                                <p>{member.position}</p>
                            </article>
                        )
                    })}
                </section>
            </div>
        </main>
    )
}
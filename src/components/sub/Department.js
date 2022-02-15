import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";


export default function Department() {
    const main = useRef(null);
    const members = useSelector(state => state.departmentReducer.members)
    console.log(members)
    const path = process.env.PUBLIC_URL;
    useEffect(() => {
        main.current.classList.add("on");
    }, [])
    return (
        <main className="content department" ref={main}>
            <figure>
            </figure>
            <div className="inner">
                <h1>Department</h1>
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
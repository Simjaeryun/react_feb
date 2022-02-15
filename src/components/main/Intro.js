import { useSelector } from "react-redux"

export default function Intro() {
    const path = process.env.PUBLIC_URL;
    const members = useSelector(state => state.departmentReducer.members)

    return (

        <section id="intro">
            <div className="inner">
                <h1>Introduction</h1>
                <div className="wrap">
                    {members.map((member, idx) => {
                        return (
                            <article key={idx}>
                                <img src={`${path}/img/${member.pic}`} alt="" />
                                <h1>{member.name}</h1>
                                <h2>{member.position}</h2>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
} 
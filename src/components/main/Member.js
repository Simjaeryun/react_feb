import { useSelector } from "react-redux"

export default function Member() {
    const path = process.env.PUBLIC_URL;
    const members = useSelector(state => state.aboutReducer.members)
    return (
        <section id="member">
            <div className="inner">
                <h1>MEMBERS</h1>
                <div className="wrap">
                    {members.map((member, idx) => {
                        return (
                            <article key={idx}>
                                <img src={`${path}/img/${member.pic}`} alt="" />
                                <h2>{member.name}</h2>
                                <h3>{member.position}</h3>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
} 
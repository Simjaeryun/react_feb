import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Department() {
    const main = useRef(null);
    const [members, setMembers] = useState([]);
    const path = process.env.PUBLIC_URL;
    const url = `${path}/db/department.json`;

    useEffect(() => {
        main.current.classList.add("on");
        axios
            .get(url)
            .then(json => {
                setMembers(json.data.data)
            });

    }, [url])
    return (
        <main className="content department" ref={main}>
            <figure>
            </figure>
            <div className="inner">
                <h1>Department</h1>
                <section>
                    {members.map((data, idx) => {
                        return (
                            <article key={idx}>
                                <img src={`${path}/img/${data.pic}`} alt="profile사진" />
                                <h2>{data.name}</h2>
                                <p>{data.position}</p>
                            </article>
                        )
                    })}
                </section>
            </div>
        </main>
    )
}
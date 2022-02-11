import { useState } from "react";

export default function News() {
    const getLocalItems = () => {
        let data = localStorage.getItem('posts');

        if (data) return JSON.parse(data);
        else return [];
    }

    const [posts] = useState(getLocalItems);

    return (
        <section className="info">
            <div className="inner">
                <h1>Recent Post</h1>
                <ul>
                    {posts.map((post, idx) => {

                        return (
                            <li key={idx}>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
} 
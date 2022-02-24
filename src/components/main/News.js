import { useState, useEffect } from 'react';

export default function News() {

    const defaultData = [
        { title: 'Hello1', content: 'Here comes description in detail.' },
        { title: 'Hello2', content: 'Here comes description in detail.' },
        { title: 'Hello3', content: 'Here comes description in detail.' },
        { title: 'Hello4', content: 'Here comes description in detail.' },
        { title: 'Hello5', content: 'Here comes description in detail.' },
        { title: 'Hello6', content: 'Here comes description in detail.' }
    ]

    const getLocalItems = () => {
        const data = localStorage.getItem('posts');
        const dataArr = JSON.parse(data)
        if (dataArr.length === 0) {
            return defaultData;
        } else {
            return JSON.parse(data);
        }
    }

    const [posts] = useState(getLocalItems);


    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, []);

    return (
        <section id='news'>
            <div className="inner">
                <h1>Q&A</h1>
                <ul>
                    {posts.map((post, idx) => {
                        return (
                            idx < 4
                                ?
                                <li key={idx}>
                                    <h2>{post.title}</h2>
                                    <p>{post.content}</p>
                                </li>
                                : null
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}
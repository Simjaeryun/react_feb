import { useState, useEffect } from 'react';

export default function News() {
    //초기 로딩시 사용자 컴퓨터에 localStorage에 데이터가 없을시 임의로 보여줄 초기 데이터
    const defaultData = [
        { title: 'Hello1', content: 'Here comes description in detail.' },
        { title: 'Hello2', content: 'Here comes description in detail.' },
        { title: 'Hello3', content: 'Here comes description in detail.' },
        { title: 'Hello4', content: 'Here comes description in detail.' },
        { title: 'Hello5', content: 'Here comes description in detail.' },
        { title: 'Hello6', content: 'Here comes description in detail.' }
    ]

    const getLocalItems = () => {
        let data = localStorage.getItem('posts');

        if (data) {
            return JSON.parse(data);
        } else {
            return defaultData;
        }
    }

    const [posts] = useState(getLocalItems);

    //posts에 초기 데이터값이 담기자마자 localStorage에도 데이터 저장
    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, []);

    return (
        <section id='news'>
            <div className="inner">
                <h1>Recent Post</h1>

                <ul>
                    {posts.map((post, idx) => {
                        if (idx < 4) {
                            return (
                                <li key={idx}>
                                    <h2>{post.title}</h2>
                                    <p>{post.content}</p>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        </section>
    )
}
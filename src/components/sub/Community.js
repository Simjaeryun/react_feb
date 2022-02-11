import { useEffect, useRef, useState } from "react";

export default function Community() {
    const main = useRef(null);
    const input = useRef(null);
    const textarea = useRef(null);
    const showBox = useRef(null);


    const [posts, setPosts] = useState([
        {
            title: 'hello',
            content: 'Here comes description in detail'
        },
        {
            title: 'hello2',
            content: 'Here comes description in detail2'
        },
    ]);

    const deletePost = (index) => {
        setPosts(
            posts.filter((_, idx) => idx !== index)
        )
    }

    const createPost = (e) => {
        e.preventDefault();
        setPosts([
            {
                title: input.current.value,
                content: textarea.current.value
            },
            ...posts

        ])
        input.current.value = "";
        textarea.current.value = "";
    }

    const enableUpdate = (index) => {
        setPosts(
            posts.map((post, idx) => {
                if (idx === index) {
                    post.enableUpdate = true;
                }
                return post
            })
        )
        console.log(posts)
    }


    useEffect(() => {
        main.current.classList.add("on");
    }, [])

    return (
        <main className="content community" ref={main}>
            <figure>
            </figure>
            <div className="inner">
                <h1>Community</h1>

                <section>
                    <div className='inputBox'>
                        <input
                            type="text"
                            placeholder='제목을 입력하세요'
                            ref={input}
                        /><br />
                        <textarea
                            cols="30"
                            rows="10"
                            placeholder='본문을 입력하세요'
                            ref={textarea}
                        >
                        </textarea><br />

                        <button onClick={(e) => {
                            e.preventDefault();
                            input.current.value = "";
                            textarea.current.value = "";
                        }}>cancel</button>
                        <button onClick={createPost}>create</button>
                    </div>

                    <div className="showList" ref={showBox}>
                        {posts.map((post, idx) => {
                            return (
                                <article key={idx}>
                                    <h2>{post.title}</h2>
                                    <p>{post.content}</p>
                                    <div className="btn">
                                        {/* delet버튼 */}
                                        <button onClick={() => {
                                            deletePost(idx)
                                        }}>Delete</button>
                                        {/* edit 버튼 */}
                                        <button onClick={() => {
                                            enableUpdate(idx)
                                        }}>Modify</button>
                                    </div>

                                </article>
                            )
                        })}
                    </div>
                </section>
            </div >
        </main >
    )
}


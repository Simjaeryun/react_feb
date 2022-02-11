import { useEffect, useRef, useState } from "react";

export default function Community() {
    const main = useRef(null);
    const input = useRef(null);
    const textarea = useRef(null);
    const showBox = useRef(null);
    const updateInput = useRef(null);
    const updateTextarea = useRef(null);

    const getLocalItems = () => {
        let data = localStorage.getItem("posts");
        if (data) return JSON.parse(data);
        else return [];
    }

    const [posts, setPosts] = useState(getLocalItems);

    const deletePost = (index) => {
        setPosts(
            posts.filter((_, idx) => idx !== index)
        )
    }

    const createPost = (e) => {
        e.preventDefault();

        const inputVal = input.current.value.trim();
        const textareaVal = textarea.current.value.trim();
        if (!inputVal || !textareaVal || textareaVal === "" || inputVal === "") {
            alert("본문과 제목을 입력하세요")
            input.current.value = "";
            textarea.current.value = "";
            return;
        }

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

    const disableUpdate = (index) => {
        setPosts(
            posts.map((post, idx) => {
                if (idx === index) {
                    post.enableUpdate = false;
                }
                return post
            })
        )
        console.log(posts)
    }

    const updatePost = (index) => {
        const updateInputVal = updateInput.current.value.trim();
        const updateTextareaVal = updateTextarea.current.value.trim();
        if (!updateInputVal || !updateTextareaVal || updateInputVal === "" || updateTextareaVal === "") {
            alert("본문과 제목을 입력하세요")
            updateInput.current.value = "";
            updateTextarea.current.value = "";
            return;
        }
        setPosts(
            posts.map((post, idx) => {
                if (idx === index) {
                    post.title = updateInput.current.value
                    post.content = updateTextarea.current.value
                    post.enableUpdate = false
                }
                return post
            })
        )
    }

    useEffect(() => {
        main.current.classList.add("on");
    }, [])

    useEffect(() => {
        console.log('posts state변경됨')
        localStorage.setItem('posts', JSON.stringify(posts))
    }, [posts]);

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
                                    {
                                        post.enableUpdate
                                            ?
                                            <>
                                                <div className="post">
                                                    <input
                                                        type="text"
                                                        defaultValue={post.title}
                                                        ref={updateInput}
                                                    />
                                                    <br />
                                                    <textarea
                                                        defaultValue={post.content}
                                                        cols="30"
                                                        rows="10"
                                                        ref={updateTextarea}
                                                    >
                                                    </textarea>
                                                    <br />
                                                </div>
                                                <div className="btns">

                                                    <button onClick={() => {
                                                        updatePost(idx)
                                                    }}>Update</button>

                                                    <button onClick={() => {
                                                        disableUpdate(idx)
                                                    }}>Cancel</button>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="post">
                                                    <h2>{post.title}</h2>
                                                    <p>{post.content}</p>
                                                </div>
                                                <div className="btns">
                                                    {/* delet버튼 */}
                                                    <button onClick={() => {
                                                        deletePost(idx)
                                                    }}>Delete</button>
                                                    {/* edit 버튼 */}
                                                    <button onClick={() => {
                                                        enableUpdate(idx)
                                                    }}>Modify</button>
                                                </div>
                                            </>
                                    }
                                </article>
                            )
                        })}
                    </div>
                </section>
            </div >
        </main >
    )
}


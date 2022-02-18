import { useEffect, useRef, useState } from "react";

export default function Qna() {
    const main = useRef(null);
    const input = useRef(null);
    const textarea = useRef(null);
    const showBox = useRef(null);
    const updateInput = useRef(null);
    const updateTextarea = useRef(null);

    const path = process.env.PUBLIC_URL;

    const getLocalItems = () => {
        let data = localStorage.getItem('posts');
        //만약 로컬저장소에 posts키값의 데이터가 있으면
        if (data) {
            //해당 데이터를 객체형태로 다시 변환해서 리턴
            return JSON.parse(data);
        }
        //로컬 저장소에 데이터가 없을때 (해당 컴포넌트가 첨 로딩시)
        else {
            return [];
        }
    }

    //getLocalItems의 리턴값에 따라 posts에 값이 할당됨
    const [posts, setPosts] = useState(getLocalItems)

    const createPost = () => {
        const inputVal = input.current.value.trim();
        const textareaVal = textarea.current.value.trim();

        if (!inputVal || !textareaVal || inputVal === '' || textareaVal === '') {
            alert('제목과 본문을 입력하세요.')
            return;
        }
        setPosts([
            {
                title: input.current.value,
                content: textarea.current.value
            },
            ...posts
        ])

        input.current.value = '';
        textarea.current.value = '';
    }

    const deletePost = index => {
        setPosts(
            posts.filter((_, idx) => idx !== index)
        )
    }

    const enableUpdate = index => {
        setPosts(
            posts.map((post, idx) => {
                if (idx === index) post.enableUpdate = true;
                return post;
            })
        )
        console.log(posts);
    }

    const disableUpdate = index => {
        setPosts(
            posts.map((post, idx) => {
                if (idx === index) post.enableUpdate = false;
                return post;
            })
        )
        console.log(posts);
    }

    //실제 post 업데이트 함수
    const updatePost = index => {
        const inputVal2 = updateInput.current.value.trim();
        const textareaVal2 = updateTextarea.current.value.trim();

        if (!inputVal2 || !textareaVal2 || inputVal2 === '' || textareaVal2 === '') {
            alert('수정할 제목과 본문을 입력하세요.')
            return;
        }
        setPosts(
            posts.map((post, idx) => {
                if (idx === index) {
                    post.title = updateInput.current.value;
                    post.content = updateTextarea.current.value;
                    post.enableUpdate = false;
                }
                return post;
            })
        )
    }

    useEffect(() => {
        main.current.classList.add('on');
    }, [])

    //posts값이 변경될때마사 실행될 hook
    useEffect(() => {
        console.log('posts state변경됨')
        //로컬스토리지에 posts키값으로 기존데이터를 문자형태로 변환해서 저장
        localStorage.setItem('posts', JSON.stringify(posts))
    }, [posts]);

    return (
        <main className="content qna" ref={main}>
            <figure>
                <img src={`${path}/img/qna.jpg`} alt="" />
                <h1 className="qna_title">Q&A</h1>
            </figure>

            <div className="inner">


                <section className="qna_content">
                    <div className='qna_input'>
                        <input
                            type="text"
                            placeholder='제목을 입력하세요'
                            ref={input}
                        /><br />
                        <textarea
                            cols="30"
                            rows="10"
                            placeholder='내용을 입력하세요'
                            ref={textarea}
                        >
                        </textarea><br />
                        <div className="qna_btn">
                            <button onClick={() => {
                                input.current.value = '';
                                textarea.current.value = '';
                            }}>cancel</button>

                            <button onClick={createPost}>create</button>
                        </div>
                    </div>

                    <div className="showList" ref={showBox}>
                        {posts.map((post, idx) => {
                            return (
                                <article key={idx}>
                                    {
                                        post.enableUpdate
                                            ?
                                            // 수정모드 일때 리턴될 JSX
                                            <>
                                                <div className="post">
                                                    <input
                                                        type="text"
                                                        defaultValue={post.title}
                                                        ref={updateInput}
                                                    /><br />
                                                    <textarea
                                                        defaultValue={post.content}
                                                        ref={updateTextarea}
                                                    >
                                                    </textarea><br />
                                                </div>

                                                <div className="btns">
                                                    <button onClick={() => updatePost(idx)}>update</button>
                                                    <button onClick={() => disableUpdate(idx)}>cancel</button>
                                                </div>
                                            </>
                                            :
                                            // 출력모드 일때 리턴될 JSX
                                            <>
                                                <div className="post">
                                                    <h2>{post.title}</h2>
                                                    <p>{post.content}</p>
                                                </div>

                                                <div className="btns">
                                                    <button onClick={() => enableUpdate(idx)}>modify</button>
                                                    <button onClick={() => deletePost(idx)}>delete</button>
                                                </div>
                                            </>
                                    }


                                </article>
                            )
                        })}
                    </div>
                </section>
            </div>
        </main>
    )
}
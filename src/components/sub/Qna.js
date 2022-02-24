import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import QnaQustion from "./subComponents/QnaQustion";
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
        if (data) {
            //해당 데이터를 객체형태로 다시 변환해서 리턴
            return JSON.parse(data);
        }
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
    }

    const disableUpdate = index => {
        setPosts(
            posts.map((post, idx) => {
                if (idx === index) post.enableUpdate = false;
                return post;
            })
        )
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


    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts))
    }, [posts]);

    return (
        <main className="content qna" ref={main}>

            <div className="inner">
                <h1 className="qna_title">Qustion<br />& Answer</h1>
                <p>Got a question? We have the answer!</p>

                <section className="qna_content">
                    <h2>
                        CANNESERIES FESTIVAL
                    </h2>
                    <QnaQustion qustion={"Who are we?"} answer={"답변입니다."} />
                    <QnaQustion qustion={"How to access previous edtions archives?"} answer={"답변입니다."} />
                    <QnaQustion qustion={"How to contact us"} answer={"답변입니다."} />
                </section>

                <section className="qna_content">
                    <h2>
                        CANNESERIES FESTIVAL
                    </h2>
                    <QnaQustion qustion={"Who are we?"} answer={"답변입니다."} />
                    <QnaQustion qustion={"How to access previous edtions archives?"} answer={"답변입니다."} />
                    <QnaQustion qustion={"How to contact us"} answer={"답변입니다."} />
                </section>

                <section className="qna_content">
                    <h2>
                        SEND A QUESTION
                    </h2>

                    <div className='qna_input'>
                        <input
                            type="text"
                            placeholder='Please enter a title'
                            ref={input}
                        /><br />
                        <textarea
                            cols="30"
                            rows="10"
                            placeholder='Please enter your question'
                            ref={textarea}
                        >
                        </textarea><br />
                        <div className="qna_btn">
                            <button onClick={() => {
                                input.current.value = '';
                                textarea.current.value = '';
                            }}>CANCLE</button>

                            <button onClick={createPost}>CREATE</button>
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
                                                    <button onClick={() => updatePost(idx)}>UPDATE</button>
                                                    <button onClick={() => disableUpdate(idx)}>CANCEL</button>
                                                </div>
                                            </>
                                            :
                                            // 출력모드 일때 리턴될 JSX
                                            <>
                                                <div className="post">
                                                    <h2>{post.title}</h2>
                                                    <div className="qna_content_txt">{post.content}</div>
                                                </div>

                                                <div className="btns">
                                                    <button onClick={() => enableUpdate(idx)}>MODIFY</button>
                                                    <button onClick={() => deletePost(idx)}>DELETE</button>
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
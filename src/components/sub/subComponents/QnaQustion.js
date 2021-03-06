import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'

export default function QnaQustion(props) {
    const answer = useRef(null)
    const [isOn, setIsOn] = useState(true);
    return (
        <div
            className="qna_content_card"
            onClick={() => {
                if (isOn) {
                    answer.current.classList.add("on")
                    setIsOn(false);
                } else {
                    answer.current.classList.remove("on")
                    setIsOn(true)
                }
            }}
        >
            <div className="qna_content_qustion">
                <h3>{props.qustion}</h3>
                <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <p className="qna_content_answer" ref={answer}>
                {props.answer}
            </p>
        </div>
    )
}
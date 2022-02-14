export default function Btns(props) {
    return (
        <ul id="btns" >
            <li onClick={() => {
                props.getIndex(0)
            }}></li>
            <li onClick={() => {
                props.getIndex(1)
            }}></li>
            <li onClick={() => {
                props.getIndex(2)
            }}></li>
            <li onClick={() => {
                props.getIndex(3)
            }}></li>


        </ul>
    )
} 
import './ListElement.css';

const ListElement = (props) => (
    <div className="ListElement" onClick={props.clicked}>
        <h1>{props.name}</h1>
        <b>gender: </b> {props.gender}<br/>
        <b>birth year: </b> {props.by}
    </div>
)

export default ListElement;
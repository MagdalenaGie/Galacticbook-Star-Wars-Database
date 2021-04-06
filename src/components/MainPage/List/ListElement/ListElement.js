import './ListElement.css';

const ListElement = (props) => (
    <div className="ListElement" onClick={props.clicked}>
        <h1 style={{marginBottom:"0px"}}>{props.name}</h1>
        <div className="ListElementInfo">
            <p><b>gender: </b> {props.gender} </p>
            <p><b>birth year: </b> {props.by}</p>
        </div>
    </div>
)

export default ListElement;
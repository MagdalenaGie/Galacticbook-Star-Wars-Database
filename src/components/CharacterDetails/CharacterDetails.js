import axios from 'axios';
import { useEffect } from 'react';

const CharacterDetails = (props) => {
    console.log("rendered!");
    useEffect(()=>{
        axios.get(props.url)
        .then(res => {
            const fetchedData = res;
            console.log(fetchedData)
        })
        .catch(err => {
            console.log(err);
        })
    }, [props.url])
}

export default CharacterDetails;
import styles from './LocationCard.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LocationCard = ({ location }) => {

    const navigate = useNavigate();

    const [residents, setResidents] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');


    const characterHandler = (id) => {

        console.log(id);
        navigate(`/character/${id}`);

    }

    const loadResidents = () => {

        if (residents.length > 0) {
            setResidents([]);
            setShow(!show);
            return;
        }

        setError('');
        Promise.all(location.residents.map((endpoint) => axios.get(endpoint))).then((data) => setResidents(data));

        setShow(!show);


    }

    return (<article className={styles.main}>
        <h1>{location.name}</h1>
        <h1>{new Date(location.created).getFullYear()}</h1>
        <p>Dimension: {location.dimension}</p>
        <p>Type: {location.type}</p>
        <button className={styles.button} onClick={loadResidents}>{show ? <h1 className={styles.btn_text}>Hide Residents</h1> : <h1 className={styles.btn_text}>See Residents</h1>}</button>
        <div className={styles.figure_container}>
            {!error && show && residents.map((resident, index) => <div onClick={() => { characterHandler(resident.data.id) }} key={index} className={styles.resident_container}><figure><img src={resident.data.image} /><figcaption style={{ "fontWeight": "800", "fontSize": "1.2rem" }}>{resident.data.name}</figcaption></figure></div>)}
        </div>
        {!error && show && residents.length === 0 && <p>No residents found !</p>}
        {error && <p>{error}</p>}

    </article>)

}


export default LocationCard;
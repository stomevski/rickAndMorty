import styles from './EpisodeCard.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const EpisodeCard = ({ episode }) => {

    const navigate = useNavigate();

    const [episodes, setEpisodes] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');


    const characterHandler = (id) => {

        console.log(id);
        navigate(`/character/${id}`);

    }

    const loadEpisodes = () => {

        if (episodes.length > 0) {
            setEpisodes([]);
            setShow(!show);
            return;
        }

        setError('');
        Promise.all(episode.characters.map((endpoint) => axios.get(endpoint))).then((data) => setEpisodes(data));

        setShow(!show);

    }





    return (<article className={styles.main}>
        <h1>{episode.name}</h1>
        <h1>{new Date(episode.air_date).getFullYear()}</h1>
        <p>Episode: {episode.episode}</p>
        <button className={styles.button} onClick={loadEpisodes}>{show ? <h1 className={styles.btn_text}>Hide Characters</h1> : <h1 className={styles.btn_text}>See Characters</h1>}</button>
        <div className={styles.figure_container}>
            {!error && show && episodes.map((episode, index) => <div onClick={() => { characterHandler(episode.data.id) }} key={index} className={styles.resident_container}><figure><img src={episode.data.image} /><figcaption style={{ "fontWeight": "800", "fontSize": "1.2rem" }}>{episode.data.name}</figcaption></figure></div>)}
        </div>
        {!error && show && episodes.length === 0 && <p>No residents found !</p>}
        {error && <p>{error}</p>}

    </article>)

}


export default EpisodeCard;
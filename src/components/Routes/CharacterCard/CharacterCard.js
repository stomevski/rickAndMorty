import styles from './CharacterCard.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CharacterCard = ({ character }) => {

    const navigate = useNavigate();

    const [episodes, setEpisodes] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');


    const seeEpisodeHandler = (id) => {

        navigate(`/episode/${id}`)


    }

    const loadEpisodes = () => {

        if (episodes.length > 0) {
            setEpisodes([]);
            setShow(!show);
            return;
        }

        setError('');

        Promise.all(character.episode.map((endpoint) => axios.get(endpoint))).then((data) => setEpisodes(data));


        setShow(!show);
    }





    return (<article className={styles.main}><div className={styles.character_container} key={character.id}>
        <img src={character.image} />
        <div className={styles.character_details}>
            <h1>{character.name}</h1>
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
            <p>Gender: {character.gender}</p>
        </div>
    </div>
        <button className={styles.button} onClick={loadEpisodes}>{show ? <h1 className={styles.btn_text}>Hide Episodes</h1> : <h1 className={styles.btn_text}>See Episodes</h1>}</button>
        <div className={styles.figure_container}>
            {show && episodes.map((episode, index) => <div onClick={() => seeEpisodeHandler(episode.data.id)} key={index} className={styles.episode_div}><h1>{episode.data.name}</h1><h1>{new Date(episode.data.air_date).getFullYear()}</h1><p>{episode.data.episode}</p></div>)}
        </div>
        {show && episodes.length === 0 && <p>No episodes found !</p>}
    </article>)

}


export default CharacterCard;
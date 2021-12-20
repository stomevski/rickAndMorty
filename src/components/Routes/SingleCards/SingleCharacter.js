import styles from './SingleCharacter.module.css';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react/cjs/react.development";

const SingleEpisode = () => {

    const params = useParams();

    const [character, setCharacter] = useState('');
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {

        axios.get(`https://rickandmortyapi.com/api/character/${params.id}`).then((data) => {
            setCharacter(data.data);
            Promise.all(data.data.episode.map((endpoint) => axios.get(endpoint))).then((data) => setEpisodes(data));
        })

    }, [])


    return (
        <div>
            <article style={{ "textAlign": "center", "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                <img style={{ "width": "30%" }} src={character.image} />
                <div>
                    <h1 style={{ "fontSize": "3rem" }}>{character.name}</h1>
                    <h1 style={{ "fontSize": "1.5rem" }}>{character.status}</h1>
                    <h1 style={{ "fontSize": "1.5rem" }}>{character.species}</h1>
                    <h1 style={{ "fontSize": "1.5rem" }}>{character.gender}</h1>
                    <h1 style={{ "fontSize": "1.5rem" }}>{character.origin?.name}</h1>
                </div>

            </article>
            <div style={{ "display": "flex", "flexWrap": "wrap", "justifyContent": "center" }}>
                {episodes.map((episode, index) => {
                    return <div className={styles.episodes_container} style={{ "textAlign": "center", "background": "#2FDD92", "borderRadius": "20px", "margin": "3% 3%" }}><h1 style={{ "fontSize": "5rem", "word-wrap": "break-word" }}>{episode.data.name}</h1>
                        <h1 style={{ "fontSize": "3rem" }}>{episode.data.air_date}</h1>
                        <h1 style={{ "fontSize": "2rem" }}>{episode.data.episode}</h1></div>
                })}
            </div>
        </div>
    )


}


export default SingleEpisode;
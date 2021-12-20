import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react/cjs/react.development";

const SingleEpisode = () => {

    const params = useParams();

    const [episode, setEpisode] = useState('');
    const [characters, setCharacters] = useState([]);

    useEffect(() => {

        axios.get(`https://rickandmortyapi.com/api/episode/${params.id}`).then((data) => {
            setEpisode(data.data);
            Promise.all(data.data.characters.map((endpoint) => axios.get(endpoint))).then((data) => setCharacters(data));
        })

    }, [])


    return (
        <div>
            <article style={{ "textAlign": "center" }}>
                <h1 style={{ "fontSize": "5rem" }}>{episode.name}</h1>
                <h1 style={{ "fontSize": "3rem" }}>{episode.air_date}</h1>
                <h1 style={{ "fontSize": "2rem" }}>{episode.episode}</h1>
            </article>
            <div style={{ "display": "flex", "flexWrap": "wrap", "justifyContent": "center" }}>
                {characters.map((character, index) => {
                    return <figure key={index}><img src={character.data.image} /><figcaption style={{ "fontWeight": "800", "fontSize": "1.2rem", "textAlign": "center" }}>{character.data.name}</figcaption></figure>
                })}
            </div>
        </div>
    )


}


export default SingleEpisode;
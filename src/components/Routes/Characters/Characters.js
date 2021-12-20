import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CharacterCard from '../CharacterCard/CharacterCard';
import styles from './Characters.module.css';

const Characters = () => {

    const [url, setUrl] = useState('https://rickandmortyapi.com/api/character');
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        setErrorMessage('');
        axios.get(url).then((data) => {
            console.log(data.data);
            setLoading(false);
            setCharacters(data.data);


        }).catch((err) => {
            console.log(err);
            setLoading(false);
            setErrorMessage(err);
        })


    }, [url]);


    const changeUrl = (newUrl, count) => {

        setUrl(newUrl);
        setPage((prev) => {
            return prev + count;
        })

    }



    return (
        <div className={styles.main_container}>
            {!loading && !errorMessage && characters.results?.map((character, index) => {

                return <CharacterCard character={character} />


            })}
            {!errorMessage && loading && <h1 style={{ "textAlign": "center", "margin": "10% auto" }}>Loading...</h1>}
            {!loading && errorMessage && <h1 style={{ "textAlign": "center", "margin": "10% auto" }}>{errorMessage}</h1>}
            <div>
                <div className={styles.navigation}>
                    {characters.info?.prev && <Link className={styles.links} onClick={() => { changeUrl(characters.info.prev, -1) }} to="/characters">Prev</Link>}
                    {characters.info?.next && <Link className={styles.links} onClick={() => { changeUrl(characters.info.next, 1) }} to="/characters">Next</Link>}
                </div>
                <h1 className={styles.navigation_page}>{`${page} / ${characters.info?.pages}`}</h1>
            </div>
        </div>
    )

}


export default Characters;
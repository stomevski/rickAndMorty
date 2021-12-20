import styles from './Episodes.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EpisodeCard from '../EpisodeCard/EpisodeCard';



const Episodes = () => {

    const [url, setUrl] = useState('https://rickandmortyapi.com/api/episode');
    const [episode, setEpisode] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        setErrorMessage('');
        axios.get(url).then((data) => {
            console.log(data.data);
            setLoading(false);
            setEpisode(data.data);


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
            {!loading && !errorMessage && episode.results?.map((episode, index) => {

                return <EpisodeCard episode={episode} />;


            })}
            {!errorMessage && loading && <h1 style={{ "textAlign": "center", "margin": "10% auto" }}>Loading...</h1>}
            {!loading && errorMessage && <h1 style={{ "textAlign": "center", "margin": "10% auto" }}>{errorMessage}</h1>}
            <div>
                <div className={styles.navigation}>
                    {episode.info?.prev && <Link className={styles.links} onClick={() => { changeUrl(episode.info.prev, -1) }} to="/episodes">Prev</Link>}
                    {episode.info?.next && <Link className={styles.links} onClick={() => { changeUrl(episode.info.next, 1) }} to="/episodes">Next</Link>}
                </div>
                <h1 className={styles.navigation_page}>{`${page} / ${episode.info?.pages}`}</h1>
            </div>
        </div>
    )

}


export default Episodes;
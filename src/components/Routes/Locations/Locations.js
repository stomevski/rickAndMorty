import styles from './Locations.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LocationCard from '../LocationCard/LocationCard';



const Locations = () => {

    const [url, setUrl] = useState('https://rickandmortyapi.com/api/location');
    const [location, setLocation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        setErrorMessage('');
        axios.get(url).then((data) => {
            console.log(data.data);
            setLoading(false);
            setLocation(data.data);


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
            {!loading && !errorMessage && location.results?.map((location, index) => {

                return <LocationCard location={location} />;


            })}
            {!errorMessage && loading && <h1 style={{ "textAlign": "center", "margin": "10% auto" }}>Loading...</h1>}
            {!loading && errorMessage && <h1 style={{ "textAlign": "center", "margin": "10% auto" }}>{errorMessage}</h1>}
            <div>
                <div className={styles.navigation}>
                    {location.info?.prev && <Link className={styles.links} onClick={() => { changeUrl(location.info.prev, -1) }} to="/locations">Prev</Link>}
                    {location.info?.next && <Link className={styles.links} onClick={() => { changeUrl(location.info.next, 1) }} to="/locations">Next</Link>}
                </div>
                <h1 className={styles.navigation_page}>{`${page} / ${location.info?.pages}`}</h1>
            </div>
        </div>
    )

}


export default Locations;
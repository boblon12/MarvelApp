import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../API/service';
import './comicsList.scss';
import ErrorMessage from '../Tools/Error/ErrorMessage';
import Loader from '../Tools/Loader/Loader';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [Offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics, clearError} = useMarvelService();

    useEffect(() => {
        onRequest(Offset, true);
    }, [])

    const onRequest = async (Offset, initial) => {
        let ended = false;
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        clearError();
        const response = await getAllComics(Offset);
        if (response.length < 8) {
            ended = true;
        }
        setComicsEnded(ended)
        setComicsList(comicsList => [...comicsList, ...response]); 
        setOffset(Offset=> Offset + 9) 
        setnewItemLoading(newItemLoading => false);
        console.log(comicsList)
    }


    function renderItems (arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__flex">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Loader/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            <div className='spinner'>{spinner} </div>
            {items}
            {comicsEnded ? 'Комиксы закончились' : 
            <button 
                disabled={newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={onRequest}>
                <div className="inner">load more</div>
            </button>}
           
        </div>
    )
}

export default ComicsList;
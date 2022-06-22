import './randomChar.scss';
import RandomCharActive from './randomCharActive/randomCharActive';
import Loader from '../Tools/Loader/Loader';
import mjolnir from '../../resources/img/mjolnir.png';
import ErrorMessage from '../Tools/Error/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandom, unsetRandom } from './RandomCharSlice';
import { useEffect } from 'react';





const RandomChar = () => {

    const dispatch = useDispatch();
    const char = useSelector(state => state.random);
 


    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;//это диапазон айдишников в котором нужно искать
        dispatch(fetchRandom(id))
       
    }

    useEffect(() => {
        updateChar()
        const timerId = setInterval(updateChar(), 50000)

        return () => {
            clearInterval(timerId);
            unsetRandom();
        }
    }, [])



    const errorMessage = char.error ? <ErrorMessage /> : null;
    const spinner = char.loading ? <Loader /> : null;
    const content = !(char.loading || char.error || !char.id) ? <RandomCharActive char={char} /> : null;




    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}



export default RandomChar;
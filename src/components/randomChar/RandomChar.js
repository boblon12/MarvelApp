import './randomChar.scss';
import { useState, useEffect} from 'react';
import RandomCharActive from './randomCharActive/randomCharActive';
import Loader from '../Tools/Loader/Loader';
import useMarvelService from '../API/service';
import mjolnir from '../../resources/img/mjolnir.png';
import ErrorMessage from '../Tools/Error/ErrorMessage';





const RandomChar = () => {


    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();


    const updateChar =  async() => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000; //это диапазон айдишников в котором нужно искать
        const rand = await getCharacter(id)
        setChar(rand);    
    }

    useEffect ( () => {
        updateChar()
        const timerId = setInterval(updateChar, 500000)

        return () => {
            clearInterval(timerId)
        }
    },[])

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Loader/> : null;
    const content = !(loading || error || !char) ? <RandomCharActive char={char} /> : null;




    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}



export default RandomChar;
import './charInfo.scss';
import CharInfo from './CharInfo';
import useMarvelService from '../API/service';
import react, { useState, useEffect } from 'react';
import Skeleton from './skeleton/skeleton';
import ErrorMessage from '../Tools/Error/ErrorMessage';
import Loader from '../Tools/Loader/Loader';

const CharInfoContainer = (props) => {

    const [char, setChar] = useState(null);
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])


    const updateChar = async () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        const response = await getCharacter(charId)
        console.log(response)
        setChar(response)
    }


    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Loader /> : null;
    const content = !(loading || error || !char) ? <CharInfo char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            <div className='spinner'>{spinner} </div>
            {content}
        </div>
    );
}

export default CharInfoContainer;
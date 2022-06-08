import ErrorMessage from '../../../Tools/Error/ErrorMessage';
import './CharInfoModal.scss'
import Loader from '../../../Tools/Loader/Loader';
import Skeleton from '../../../charInfo/skeleton/skeleton';
import useMarvelService from '../../../API/service';
import {useEffect, useState} from 'react';
import CharInfoModalLayot from './CharInfoModalLayot';


const CharModalInfoModal = (props) => {

  
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
    const content = !(loading || error || !char) ? <CharInfoModalLayot char={char} /> : null;

    return (
        <div className="char__modal__info">
            {skeleton}
            {errorMessage}
            <div className='spinner'>{spinner} </div>
            {content}
        </div>
    );
    }



export default CharModalInfoModal;
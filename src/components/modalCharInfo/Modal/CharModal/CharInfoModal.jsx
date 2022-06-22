import ErrorMessage from '../../../Tools/Error/ErrorMessage';
import './CharInfoModal.scss'
import Loader from '../../../Tools/Loader/Loader';
import Skeleton from '../../../charInfo/skeleton/skeleton';
import { useEffect } from 'react';
import CharInfoModalLayot from './CharInfoModalLayot';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHero } from '../../../charInfo/CharInfoSlice';




const CharModalInfoModal = (props) => {

    const dispatch = useDispatch();
    const hero = useSelector(state => state.hero);


    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        dispatch(fetchHero(charId))
    }

    useEffect(() => {
        updateChar()
    }, [props.charId])


   


    const skeleton = hero || hero.loading || hero.error ? null : <Skeleton />;
    const errorMessage = hero.error ? <ErrorMessage /> : null;
    const spinner = hero.loading ? <Loader /> : null;
    const content = !(hero.loading || hero.error || !hero) ? <CharInfoModalLayot char={hero} /> : null;

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
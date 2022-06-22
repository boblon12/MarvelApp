import './charInfo.scss';
import CharInfo from './CharInfo';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Skeleton from './skeleton/skeleton';
import ErrorMessage from '../Tools/Error/ErrorMessage';
import Loader from '../Tools/Loader/Loader';
import { fetchHero } from './CharInfoSlice';



const CharInfoContainer = (props) => {

    
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


  


    const skeleton = (hero.id !== null) || hero.loading || hero.error ? null : <Skeleton />;
    const errorMessage = hero.error ? <ErrorMessage /> : null;
    const spinner = hero.loading ? <Loader /> : null;
    const content = !(hero.loading || hero.error || !hero.id) ? <CharInfo char={hero} /> : null;

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
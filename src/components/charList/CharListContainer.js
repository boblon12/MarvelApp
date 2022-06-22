import './charList.scss';

import { useRef, useState, useEffect } from 'react';
import ErrorMessage from '../Tools/Error/ErrorMessage';
import Loader from '../Tools/Loader/Loader';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes, unsetHeroes } from './CharListSlice';



const CharListContainer = (props) => {

    const heroes = useSelector(state => state.heroes.heroes);
    const condition = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const screenWidth = window.screen.width
    const [Offset, setOffset] = useState(209);
    const itemRefs = useRef([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
 
    useEffect(() => {
        dispatch(fetchHeroes(Offset));

        return () => {
            dispatch(unsetHeroes());
        }
    }, [])

    const loadNewCharacters = (Offset, initial=true) => {
        setOffset(Offset=> Offset + 9) 
        initial ? setNewItemLoading(true) : setNewItemLoading(false);
        dispatch(fetchHeroes(Offset))
        setNewItemLoading(false) 
    }

    const focusOnItem = (id) => {
        //Немного геморойно реализовал, наверное можно было ссделать лучше
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    const errorMessage = condition.error ? <ErrorMessage/> : null;
    const spinner = condition.loading ? <Loader/> : null;


    function renderItems(arr) {
        const items =  arr.map((item, i) => {

            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        if (screenWidth < 1600) {
                            props.setVisibleClick()
                        }
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                        
                    }}
                    >
                        <img src={item.thumbnail} alt={item.name} />
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    
    const items = renderItems(heroes);

    return (
        <div className="char__list">
        {errorMessage}
        {items}
        <div className='spinner'>{spinner} </div>
        <button disabled={newItemLoading} onClick = {loadNewCharacters} className="button button__main button__long">
            <div className="inner">load more</div>
        </button>
       
    </div>
    );
    
}

CharListContainer.prototype = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharListContainer;
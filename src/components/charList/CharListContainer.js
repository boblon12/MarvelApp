import './charList.scss';
import useMarvelService from '../API/service';
import { useRef, useState, useEffect } from 'react';
import ErrorMessage from '../Tools/Error/ErrorMessage';
import Loader from '../Tools/Loader/Loader';
import PropTypes from 'prop-types';


const CharListContainer = (props) => {

   
    const screenWidth = window.screen.width
    const [CharList, setCharList] = useState([]);
    const [Offset, setOffset] = useState(209);
    const {loading, error, getAllCharacters, clearError} = useMarvelService();
    const itemRefs = useRef([]);
    const [newItemLoading, setNewItemLoading] = useState(false)

    useEffect(() => {
        loadNewCharacters(Offset, true);
    }, [])

    const loadNewCharacters =  async(Offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        clearError();
        const response = await  getAllCharacters(Offset)
        setCharList(CharList => [...CharList, ...response]); 
        setOffset(Offset=> Offset + 9) 
        setNewItemLoading(newItemLoading => false) 
    }

    const focusOnItem = (id) => {
        //Немного геморойно реализовал, наверное можно было ссделать лучше
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Loader/> : null;


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
    
    const items = renderItems(CharList);

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
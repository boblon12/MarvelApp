import React from 'react'
import './FindCharTop.scss'

function FindCharContainerTop() {
    return (
        <div className='char__find__top'>
            <div className="char__find__top__inputs">
                <input type="text" name="" id="" placeholder='Enter character' />
                <h2>Something went wrong...</h2>
            </div>
            <div className="char__find__top__buttons">
                <a href="#" className="button button__main">
                    <div className="inner">FIND</div>
                </a>
                <a href="#" className="button button__secondary">
                    <div className="inner">Look</div>
                </a>
            </div>

        </div>
    )
}

export default FindCharContainerTop
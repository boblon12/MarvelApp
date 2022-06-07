import React from 'react'
import thor from '../../../resources/img/thor.jpeg';
import '../randomChar.scss';



function RandomCharActive() {
  return (
    <div className="randomchar__block">
                <div className='randomchar__image'>
                    <img src={thor} alt="Random character" />
                </div>
                <div className="randomchar__info">
                    <p className="randomchar__name">Hello</p>
                    <p className="randomchar__descr">Description</p>
                    <div className="randomchar__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
  )
}

export default RandomCharActive
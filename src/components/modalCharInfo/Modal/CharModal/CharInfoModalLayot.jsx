import React from 'react'

function CharInfoModalLayot({char}) {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return (
        <div className="char__modal__info">
            <div className="char__modal__basics">
                <div className='char__modal__image'><img src={thumbnail}  alt={name}/></div>
                
                <div>
                    <div className="char__modal__info-name">{name}</div>
                    <div className="char__modal__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__modal__descr">
               {description}
            </div>
            <div className="char__modal__comics">Comics:</div>
            <ul className="char__modal__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__modal__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }                
            </ul>
        </div>
    )
}

export default CharInfoModalLayot
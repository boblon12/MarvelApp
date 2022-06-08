import React from 'react'

function CharInfo({char}) {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    return (
        <div>
            <div className="char__basics">
                <div className='char__image'><img src={thumbnail} alt={name} /></div>

                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics'}
                {comics.map( (item, i) => {
                   if (i > 9) return;
                   return (
                       <li key={i} className="char__comics-item">
                           {item.name}
                       </li>
                   )
                })}
            </ul>
        </div>
    )
}

export default CharInfo
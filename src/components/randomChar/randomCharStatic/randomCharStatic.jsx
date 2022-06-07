import React from 'react'
import mjolnir from '../../../resources/img/mjolnir.png';
import '../randomChar.scss';

function RandomCharStatic() {
  return (
    <div className="randomchar__static">
    <p className="randomchar__title">
        Random character for today!<br />
        Do you want to get to know him better?
    </p>
    <p className="randomchar__title">
        Or choose another one if you want!

        Marvel Studio
    </p>
    <button className="button button__main">
        <div className="inner">try it</div>
    </button>
    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
</div>
  )
}

export default RandomCharStatic
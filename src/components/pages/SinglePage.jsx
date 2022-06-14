import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useMarvelService from '../API/service';
import AppBanner from '../appBanner/AppBanner';
import ErrorMessage from '../Tools/Error/ErrorMessage';
import Loader from '../Tools/Loader/Loader';
import './SinglePage.scss';


function SinglePage({ type }) {

  const { id } = useParams();
  const [comics, setComics] = useState('');
  const [char, setChar] = useState('');
  const { loading, error, clearError, getComic, getCharacter } = useMarvelService();

  useEffect(() => {

    if (type === 'charater') updateChar(id);
    else updateComics(id)

  }, [id])

  const updateComics = async (id) => {
    clearError()
    const response = await getComic(id)
    console.log(response)
    setComics(response)
  }

  const updateChar = async (id) => {
    clearError()
    const responsechar = await getCharacter(id)
    const newChar = responsechar
    setChar(newChar)  
  }


  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Loader /> : null;
  const contentComic = !(loading || error || !comics) ? <ViewComic comics={comics} /> : null;
  const contentChar = !(loading || error || !char) ? <ViewChar char={char} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      <div className='spinner'>{spinner} </div>
      {contentComic}
      {contentChar}
    </>
  );

}

const ViewComic = ({ comics }) => {

  const { title, description, pageCount, thumbnail, language, price } = comics;


  return (
      <div className='single__page'>
        <div className="single__short-info">
          <div className="single__image">
            <img src={thumbnail} alt="" className="single__image__item" />
          </div>
          <div className="single__short-info__content">
            <h3 className="pageCount">Pages : ${pageCount}</h3>
            <h3 className="language">Langueage: ${language}</h3>
            <h3 className="price">Price: ${price} $</h3>
          </div>
        </div>
        <div className="single__content">
          <h1 className="single__title">{title}</h1>
          <p className="single__description">{description}</p>
        </div>
      </div>
  );
}

const ViewChar = ({ char }) => {

  const { name, description, thumbnail, homepage, wiki} = char;

  return (
    <div className='single__page'>
      <div className="single__short-info">
        <div className="single__image">
          <img src={thumbnail} alt="" className="single__image__item" />
        </div>
        <div className="single__short-info__content">
        <h3 className="pageCount"><a href={wiki}>HOMEPAGE</a>
          </h3>
          <h3 className="pageCount"><a href={homepage}>WIKI</a>
          </h3>
        </div>
      </div>
      <div className="single__content">
        <h1 className="single__title">{name}</h1>
        <p className="single__description">{description}</p>
      </div>
    </div>
  )
}

export default SinglePage
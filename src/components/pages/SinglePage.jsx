import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useMarvelService from '../API/service';
import AppBanner from '../appBanner/AppBanner';
import ErrorMessage from '../Tools/Error/ErrorMessage';
import Loader from '../Tools/Loader/Loader';
import './SinglePage.scss';


function SinglePage() {
 
  const { id } = useParams();
  const [comics, setComics] = useState(null);
  const {loading, error, clearError, getComic} = useMarvelService();

  useEffect(() => {
    updateComic(id);
  }, [id])

  const updateComic = async (id) => {
    console.log(id)
    clearError();
    const respone = await getComic(id);
    setComics(respone);
  }


  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Loader /> : null;
  const content = !(loading || error || !comics) ? <View comics={comics} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      <div className='spinner'>{spinner} </div>
      {content}
    </>
  );

}

const View = ({ comics }) => {

  const { title, description, pageCount, thumbnail, language, price } = comics;
  return (<>

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
  </>);
}

export default SinglePage
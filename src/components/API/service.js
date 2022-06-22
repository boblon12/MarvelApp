import {useHttp} from '../hooks/useHttp';


const useMarvelService = () => {
    const {request} = useHttp();
    
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
    const _apiKey = 'apikey=74ebea2ecadc421048a215ba40c5e6b5';
  
    const getAllCharacters = async (offset = 100) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacterByName = async (name) => {
        let newName = String(name.name)
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?name=${newName}&apikey=74ebea2ecadc421048a215ba40c5e6b5`);
        return res.data.results.map(_transformCharacter);
        
    }
 
    const getCharacter = async (id=1011320) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 209) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
        }
    }

    return {getAllCharacters, getCharacter, getAllComics, getComic, getCharacterByName}
}

export default useMarvelService;





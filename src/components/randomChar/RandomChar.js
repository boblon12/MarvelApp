import './randomChar.scss';
import Service from '../API/service';
import { useState, useEffect } from 'react';
import RandomCharActive from './randomCharActive/randomCharActive';
import RandomCharStatic from './randomCharStatic/randomCharStatic';
import Loader from '../Tools/Loader/Loader';




const RandomChar = () => {


    const [charRandom, setChar] = useState('');


    async function getRandomChar() {
        const random = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        const response = await Service.getCharacters(random)
        const char = response.data.data.results[0]
        setChar(char)
    }

    useEffect( () => {
        getRandomChar()
        console.log(charRandom)
    }, [])



    return (
        <div className="randomchar">    
            <RandomCharActive/>
            <RandomCharStatic/>
        </div>
    )
}

export default RandomChar;
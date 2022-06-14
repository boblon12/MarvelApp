import React, { useState, useEffect } from 'react'
import './FindChar.scss'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useMarvelService from '../API/service';
import Loader from '../Tools/Loader/Loader';
import { Link } from 'react-router-dom';


const schema = yup.object({
    name: yup.string().required().min(3, 'Must be min 3 letters'),
}).required();





function FindCharContainer() {

    const [char, setChar] = useState('');
    const { loading, error, getCharacterByName, clearError } = useMarvelService();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        clearError()
        const response = await getCharacterByName(data.name);
        setChar(response)
    }

    const spinner = loading ? <Loader /> : null;
    const errorMes = errors ? <h2 style={{ 'color': '#9F0013' }}>{errors.name?.message}</h2> : null;
    const content = !char ? null : char.length > 0 ?
        <h2 style={{ 'color': 'green' }} >Found it! {char[0].name}</h2>
        :
        <h2 style={{ 'color': '#9F0013' }} >Character not found</h2>


    return (
        <div className='char__find'>
            {spinner ? spinner : 
            <>
                <form className="char__find__inputs" id='bg' onSubmit={handleSubmit(onSubmit)}>
                    <input  {...register("name", { required: true })} type="text" placeholder='Enter character' />
                    {errorMes}
                    <input className='input' type="submit" />
                </form>
                <div className="char__find__inputs">
                    {content}
                    {char.length > 0 ? 
                    <Link to={`/characters/${char[0].id}`}>
                        <input style={{ 'backgroundColor': '#5C5C5C' }} className='input' type="submit" value={char[0].name} />
                    </Link>
                    :
                    <input style={{ 'backgroundColor': '#5C5C5C' }} className='input' type="submit" value='Просто кнопка' />
                    }  
                </div>
            </>
            }

        </div>

    )
}

export default FindCharContainer
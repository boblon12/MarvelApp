import React from 'react'
import './FindChar.scss'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Loader from '../Tools/Loader/Loader';
import { Link } from 'react-router-dom';
import { fetchFindChar } from './FindCharSlice';
import { useDispatch, useSelector } from 'react-redux';



const schema = yup.object({
    name: yup.string().required().min(3, 'Must be min 3 letters'),
}).required();





function FindCharContainer() {


    const char = useSelector(state => state.findChar);

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        dispatch(fetchFindChar(data))
    }



    const spinner = char.loading ? <Loader /> : null;
    const errorMes = char.error ? <h2 style={{ 'color': '#9F0013' }}>{errors.name?.message}</h2> : null;
    const content = (char.char[0] === null) ? null : char.char.length !== 0 ?
        <h2 style={{ 'color': 'green' }} >Found it! {char.char[0].name}</h2>
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
                        {(char.char[0] == [] || char.char[0] == null) ?
                            <input style={{ 'backgroundColor': '#5C5C5C' }} className='input' type="submit" value='Просто кнопка' />
                            :
                            <Link to={`/characters/${char?.char[0]?.id}`}>
                                <input style={{ 'backgroundColor': '#5C5C5C' }} className='input' type="submit" value={char?.char[0]?.name} />
                            </Link>

                        }
                    </div>
                </>
            }

        </div>

    )
}

export default FindCharContainer
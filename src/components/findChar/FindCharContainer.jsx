import React from 'react'
import './FindChar.scss'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required(),
}).required();





function FindCharContainer() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
  
    const onSubmit = (data) => console.log(data.name)


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name", {required: true})} type="text" placeholder='Enter character' />
            <p>{errors.name?.message}</p>
            <input type="submit"/>
            </form>
        </>

    )
}

export default FindCharContainer
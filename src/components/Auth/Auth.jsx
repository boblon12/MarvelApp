import React from 'react'
import './Auth.scss'

function Auth() {
    return (
        <>
        <form class="login">
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>
                <button className='login_button'>Login</button>
        </form>
        </>
    )
}

export default Auth
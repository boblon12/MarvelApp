import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';
import Comics from '../pages/Comics';


const AppHeader = () => {

    const openBurger = () => {
        document.querySelector('.burger span').classList.toggle('active');
        document.querySelector('.menu').classList.toggle("animate");
        document.querySelector('.app__menu').classList.toggle('inactive');
        document.querySelector('.app__title').classList.toggle('inactive');
    }

    let activeStyleclass = {
        'color': "#9f0013",
        'font-weight': 'bold' 
    };

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink exact activeStyle={{ 'color': '#9f0013' }} to="/">Characters</NavLink></li>
                    /
                    <li><NavLink activeStyle={{ 'color': '#9f0013' }} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
            <div className="burger" onClick={openBurger}>
                <span></span>
            </div>
            <div className='menu' onClick={openBurger}>
                <ul onClick={(e) => e.stopPropagation()}>
                    <li onClick={openBurger}>
                        <NavLink exact style={({ isActive }) =>
                            isActive ? activeStyleclass : undefined
                        } to="/">
                            HOME
                        </NavLink>
                    </li>
                    <NavLink style={({ isActive }) =>
                            isActive ? activeStyleclass : undefined
                        } to="/comics"><li onClick={openBurger}>COMICS</li></NavLink>
                </ul>
            </div>
        </header>
    )
}

export default AppHeader;
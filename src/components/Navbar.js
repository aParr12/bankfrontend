import './Navbar.css';
import {pages} from '../pages/page-definitions';
import {Link, NavLink} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {GlobalContext} from '../GlobalContext';

export const Navbar = () => {
    const {state, getUser, signOut} = useContext(GlobalContext);
    const {currentUser} = state;

    useEffect(() => {
        if (localStorage.getItem('authToken')){
            getUser();
        }
    }, []);

    return (<nav className='Navbar navbar navbar-expand-lg bg-light'>
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/'>Banking App</Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNavAltMarkup'
                    aria-controls='navbarNavAltMarkup'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                    <div className='navbar-nav'>
                        {pages.filter(e => !currentUser || e.whenSignedIn !== false).map(({name, url, description}) => {
                            return (<NavLink
                                    key={url}
                                    to={url}
                                    className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
                                >
                                    {name}
                                    <span className='custom-tooltip'>{description}</span>
                                </NavLink>);
                        })}
                    </div>
                    {currentUser && <span className='navbar-text'>Current User: {currentUser.name}
                        <button onClick={signOut} className='sign-out'>Sign out</button> </span>}
                </div>
            </div>
        </nav>);
};

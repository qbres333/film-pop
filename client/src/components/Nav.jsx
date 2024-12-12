// Contains the navbar
import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonOr, ButtonGroup, Button } from 'semantic-ui-react';
import Header from "./Header";

function Nav({ currentPage, handlePageChange }) {
    return (
        <>
            <div>
                <ButtonGroup className='login-signup' size='medium' floated='right' inverted color='blue'>
                    <Button>
                        <Link to="/signup" 
                            onClick={() => handlePageChange('Signup')}
                            className={currentPage === 'Signup' ? 'nav-link active' : 'nav-link'}
                        >
                            Signup
                        </Link>
                    </Button>
                    <ButtonOr />
                    <Button>
                        <Link to="/login"
                            onClick={() => handlePageChange('Login')}
                            className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
                        >
                            Login
                        </Link>
                    </Button>
                </ButtonGroup>
                <Header />
            </div>
        </>
    );
}

export default Nav;
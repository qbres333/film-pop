// Contains the navbar
import React from 'react';
import { ButtonOr, ButtonGroup, Button } from 'semantic-ui-react';
import Header from "./Header";

function Nav({ currentPage, handlePageChange }) {
    return (
        <div>
            <ButtonGroup className='login-signup' ButtonGroup size='medium' floated='right' inverted color='blue'>
                <Button>
                    <a
                        href="#signup"
                        onClick={() => handlePageChange('Signup')}
                        className={currentPage === 'Signup' ? 'nav-link active' : 'nav-link'}
                    >
                        Signup
                    </a>
                </Button>
                <ButtonOr />
                <Button>
                    <a
                        href="#login"
                        onClick={() => handlePageChange('Login')}
                        className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
                    >
                        Login
                    </a>
                </Button>
            </ButtonGroup>
            <Header />
        </div>
    );
}

export default Nav;
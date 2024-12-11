// Contains the navbar
import React from 'react';
import { ButtonOr, ButtonGroup, Button } from 'semantic-ui-react';

function Nav({ currentPage, handlePageChange }) {
    return (
        <div>
            <ButtonGroup ButtonGroup size='medium' floated='right' inverted color='blue'>
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
        </div>
    );
}

export default Nav;
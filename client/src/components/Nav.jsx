// Contains the navbar
import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonOr, ButtonGroup, Button } from 'semantic-ui-react';
import Header from "./Header";
import Auth from '../utils/auth';

function Nav({ currentPage }) {
    return (
        <>
            {
                // if user is logged in, show MyMoviesCollection page and Logout button
                Auth.loggedIn() ?
                    (
                        <div className="login-signup">
                            <ButtonGroup size="medium" floated="right" inverted color="blue">
                                <Button>
                                    <Link
                                        to="/mymovies"
                                        className={
                                            currentPage === "Signup" ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        My Movies Collection
                                    </Link>
                                </Button>
                                <ButtonOr />
                                <Button>
                                    <Link
                                        to="#"
                                        onClick={() => Auth.logout()}
                                        className={
                                            currentPage === "Signup" ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        Logout
                                    </Link>
                                </Button>
                            </ButtonGroup>
                        </div>
                    ) : (
                        <div className="login-signup">
                            <ButtonGroup size="medium" floated="right" inverted color="blue">
                                <Button>
                                    <Link
                                        to="/signup"
                                        className={
                                            currentPage === "Signup" ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        Signup
                                    </Link>
                                </Button>
                                <ButtonOr />
                                <Button>
                                    <Link
                                        to="/login"
                                        className={
                                            currentPage === "Login" ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        Login
                                    </Link>
                                </Button>
                            </ButtonGroup>
                        </div>
                    )
            }
            <Header />
        </>
    );
}

export default Nav;
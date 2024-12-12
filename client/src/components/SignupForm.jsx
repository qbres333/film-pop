import { useState, useEffect } from 'react';

const SignupForm = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // set state for error messages
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });

    // Handle signup form input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({
            ...formData,
            [name]: value,
        });
    };

    // Make sure email, password, and username is not empty
    useEffect(() => {
        const validateForm = () => {
            let formErrors = {};

            if (!userFormData.username) {
                formErrors.username = 'Username is required to signup.';
            }

            if (!userFormData.email) {
                formErrors.email = 'Email is required to signup.';
            }

            if (!userFormData.password) {
                formErrors.password = 'Password is required to signup';
            }

            setErrors(formErrors);
        };

        validateForm();
    }, [formData]);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            alert('Congrats! You have signed up successfully!');
            // Clear form after submission
            setUserFormData({
                name: '',
                email: '',
                password: '',
            });
        }
    };

    return (
        <>
            <div>
                <h2>Signup Form</h2>
                <form onSubmit={handleSubmit}>
=                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userFormData.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <button>Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignupForm;
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

            if (!formData.username) {
                formErrors.username = 'Username is required to signup.';
            }

            if (!formData.email) {
                formErrors.email = 'Email is required to signup.';
            }

            if (!formData.password) {
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
        <></>
    )
}

export default SignupForm;
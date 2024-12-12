import { useState, useEffect } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';

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
            ...userFormData,
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

    // Referred to module 21 challenge assignment
    return (
        <>
            {/* This is needed for the validation functionality */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                {/* Show alert if server response is bad */}
                {showAlert && (
                    <Message
                        error
                        onDismiss={() => setShowAlert(false)}
                        header="Something went wrong with your signup!"
                    />
                )}

                {/* Username Field */}
                <Form.Field required>
                    <label htmlFor="username">Username</label>
                    <Input
                        type="text"
                        placeholder="Your username"
                        name="username"
                        onChange={handleChange}
                        value={userFormData.username}
                        fluid
                    />
                    {!userFormData.username && validated && (
                        <Message
                            error
                            content="Username is required!"
                        />
                    )}
                </Form.Field>

                {/* Email Field */}
                <Form.Field required>
                    <label htmlFor="email">Email</label>
                    <Input
                        type="email"
                        placeholder="Your email address"
                        name="email"
                        onChange={handleChange}
                        value={userFormData.email}
                        fluid
                    />
                    {!userFormData.email && validated && (
                        <Message
                            error
                            content="Email is required!"
                        />
                    )}
                </Form.Field>


                {/* Password Field */}
                <Form.Field required>
                    <label htmlFor="password">Password</label>
                    <Input
                        type="password"
                        placeholder="Your password"
                        name="password"
                        onChange={handleChange}
                        value={userFormData.password}
                        fluid
                    />
                    {!userFormData.password && validated && (
                        <Message
                            error
                            content="Password is required!"
                        />
                    )}
                </Form.Field>

                {/* Submit Button */}
                <Button
                    type="submit"
                    primary
                    disabled={
                        !(
                            userFormData.username &&
                            userFormData.email &&
                            userFormData.password
                        )
                    }
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default SignupForm;
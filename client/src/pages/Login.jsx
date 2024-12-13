// referenced module 22 challenge assignment
import React from 'react'
import { useState } from 'react';
import { FormInput, Form, Button, Message } from 'semantic-ui-react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [login, { error }] = useMutation(LOGIN_USER);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <h1 as='h3' textAlign='center' className='knewave-signup'> Login Form </h1>

      {/* Login Form */}
      <Form onSubmit={handleFormSubmit}>
        <FormInput
          label={<label className='knewave-input' style={{ color: 'white', textAlign: 'left' }}>Email:</label>}
          type="email"
          name="email"
          placeholder="Your email"
          value={formState.email}
          onChange={handleChange}
          required
        />
        <FormInput
          label={<label className='knewave-input' style={{ color: 'white', textAlign: 'left' }}>Password:</label>}
          type="password"
          name="password"
          placeholder="*******"
          value={formState.password}
          onChange={handleChange}
          required
        />

        <Button
          inverted color='blue'
          size='large'
          floated='left'
          style={{ cursor: 'pointer' }}
          type="submit"
          primary
          disabled={!(formState.email && formState.password)}
        >
          Submit
        </Button>
      </Form>

      {error && (
        <Message
          error
          header="Error loggin in!"
          content={error.message}
        />
      )}
    </>
  );
};

export default Login;
// import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormInput, Button, Form, Message } from 'semantic-ui-react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState.username);

    try {
      // const { data } = await addUser({
      //   variables: { ...formState },
      // });

      // mod 22 act 26
      // mutation hook expects an object with named variables
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          username: formState.username,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1 as="h3" textAlign="center" className="knewave-signup">
        {" "}
        Sign Up Form{" "}
      </h1>
      {data ? (
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <Form onSubmit={handleFormSubmit}>
          <FormInput
            label={
              <label
                className="knewave-input"
                style={{ color: "white", textAlign: "left" }}
              >
                Username:
              </label>
            }
            placeholder="Your username"
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
          />
          <FormInput
            label={
              <label
                className="knewave-input"
                style={{ color: "white", textAlign: "left" }}
              >
                Email:
              </label>
            }
            placeholder="Enter your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <FormInput
            label={
              <label
                className="knewave-input"
                style={{ color: "white", textAlign: "left" }}
              >
                Password:
              </label>
            }
            placeholder="*********"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <Button
            inverted
            color="blue"
            size="large"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}

      {error && (
        <Message error header="Error signing up!" content={error.message} />
      )}
    </>
  );
};

export default Signup;

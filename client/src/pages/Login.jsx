import React from 'react'
import { FormInput, Button, Form } from 'semantic-ui-react';


export default function Login() {
  return (
    <>
      <Form >
        <FormInput
          label={<label style={{ color: 'white' }}>Email</label>}
          placeholder='joe@hotmail.com'
          fluid
        />
        <FormInput
          label={<label style={{ color: 'white' }}>Password</label>}
          placeholder='*********'
          fluid
        />

        <Button inverted color='blue' size='large' floated='left'>Login</Button>
      </Form>
    </>
  );
}
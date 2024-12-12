import React from 'react';
import { FormInput, Button, Form } from 'semantic-ui-react';


export default function Signup() {
  return (
    <>
      <Form >
        <FormInput 
          label={<label style={{ color: 'white' }}>Username</label>} 
          placeholder='username'
          fluid
          id='form-input-username'
        />
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
        <Button>Submit</Button>
      </Form>
    </>
  );
}

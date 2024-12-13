// // referenced module 22 challenge assignment
// import { useState, useEffect } from 'react';
// import { Form, Button, Message } from 'semantic-ui-react';

// import { useMutation } from '@apollo/client';

// const LoginForm = () => {
//     const [userFormData, setUserFormData] = useState({ email: '', password: '' });
//     const [validated] = useState(false);
//     const [showAlert, setShowAlert] = useState(false);
  
//     const [login, { error }] = useMutation(LOGIN_USER);
  
//     useEffect(() => {
//       if (error) {
//         setShowAlert(true);
//       } else {
//         setShowAlert(false);
//       }
//     }, [error]);
  
//     const handleChange = (event) => {
//       const { name, value } = event.target;
//       setUserFormData({ ...userFormData, [name]: value });
//     };
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();
  
//       const form = event.currentTarget;
//       if (form.checkValidity() === false) {
//         event.preventDefault();
//         event.stopPropagation();
//       }
  
//       try {
//         const { data } = await login({
//           variables: { ...userFormData },
//         });
  
//         console.log(data);
//         Auth.login(data.login.token);
//       } catch (e) {
//         console.error(e);
//       }
  
//       // clear form values
//       setUserFormData({
//         email: '',
//         password: '',
//       });
//     };
  
//     return (
//         <>
//         {/* Message for Error */}
//         {showAlert && (
//           <Message
//             negative
//             onDismiss={() => setShowAlert(false)}
//           >
//             <Message.Header>Something went wrong with your login credentials!</Message.Header>
//           </Message>
//         )}
  
//         {/* Login Form */}
//         <Form validated={validated} onSubmit={handleSubmit}>
//           <Form.Field required>
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Your email"
//               value={userFormData.email}
//               onChange={handleChange}
//               required
//             />
//           </Form.Field>
  
//           <Form.Field required>
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Your password"
//               value={userFormData.password}
//               onChange={handleChange}
//               required
//             />
//           </Form.Field>
  
//           <Button
//             type="submit"
//             primary
//             disabled={!(userFormData.email && userFormData.password)}
//           >
//             Submit
//           </Button>
//         </Form>
//       </>  
//     );
// };

// export default LoginForm;
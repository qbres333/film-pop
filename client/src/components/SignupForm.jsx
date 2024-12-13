// import { useState, useEffect } from 'react';
// import {
//     ModalHeader,
//     ModalContent,
//     ModalActions,
//     Button,
//     Modal,
//     Form, 
//     Message, 
//     Input,
//   } from 'semantic-ui-react'

// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';
// import Auth from '../utils/auth';

// const SignupForm = () => {
//     // set initial form state
//     const [userFormData, setUserFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });

//     // set state for form validation
//     const [validated] = useState(false);

//     // set state for alert
//     const [showAlert, setShowAlert] = useState(false);
//     // set state for success
//     const [successMessage, setSuccessMessage] = useState('');
//     // Modal state to control visibility
//     const [openModal, setOpenModal] = useState(false);

//     const [addUser, { error }] = useMutation(ADD_USER);

//     // set state to handle error messages / alerts
//     useEffect(() => {
//         if (error) {
//             setShowAlert(true);
//         } else {
//             setShowAlert(false);
//         }
//     }, [error]);


//     // Handle signup form input change
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setUserFormData({
//             ...userFormData,
//             [name]: value,
//         });
//     };


//     // Handle form submission
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Make sure email, password, and username is not empty
//         if (!userFormData.username || !userFormData.email || !userFormData.password) {
//             return;
//         }

//         try {
//             const { data } = await addUser({
//                 variables: { ...userFormData },
//             });
//             console.log(data);
//             Auth.login(data.addUser.token);
//             setSuccessMessage('Nice, you have signed up successfully!');
//             setOpenModal(true); // Open the modal on successful signup
//         } catch (err) {
//             console.error(err);
//             setSuccessMessage('');
//         }

//         // Clear form after submission
//         setUserFormData({
//             name: '',
//             email: '',
//             password: '',
//         });
//     };

//     // Referred to module 21 challenge assignment
//     return (
//         <>
//             {/* This is needed for the validation functionality */}
//             <Form onSubmit={handleSubmit}>

//                 {/* Show success message */}
//                 {successMessage && (
//                     <Message
//                         success
//                         onDismiss={() => setSuccessMessage('')}
//                         header={successMessage}
//                     />
//                 )}

//                 {/* Show alert if server response is bad */}
//                 {showAlert && (
//                     <Message
//                         error
//                         onDismiss={() => setShowAlert(false)}
//                         header="Something went wrong with your signup!"
//                     />
//                 )}

//                 {/* Username Field */}
//                 <Form.Field required>
//                     <label htmlFor="username">Username</label>
//                     <Input
//                         type="text"
//                         placeholder="Your username"
//                         name="username"
//                         onChange={handleChange}
//                         value={userFormData.username}
//                         fluid
//                     />
//                     {!userFormData.username && validated && (
//                         <Message
//                             error
//                             content="Username is required!"
//                         />
//                     )}
//                 </Form.Field>

//                 {/* Email Field */}
//                 <Form.Field required>
//                     <label htmlFor="email">Email</label>
//                     <Input
//                         type="email"
//                         placeholder="Your email address"
//                         name="email"
//                         onChange={handleChange}
//                         value={userFormData.email}
//                         fluid
//                     />
//                     {!userFormData.email && validated && (
//                         <Message
//                             error
//                             content="Email is required!"
//                         />
//                     )}
//                 </Form.Field>


//                 {/* Password Field */}
//                 <Form.Field required>
//                     <label htmlFor="password">Password</label>
//                     <Input
//                         type="password"
//                         placeholder="Your password"
//                         name="password"
//                         onChange={handleChange}
//                         value={userFormData.password}
//                         fluid
//                     />
//                     {!userFormData.password && validated && (
//                         <Message
//                             error
//                             content="Password is required!"
//                         />
//                     )}
//                 </Form.Field>

//                 {/* Submit Button */}
//                 <Button
//                     type="submit"
//                     primary
//                     disabled={
//                         !(
//                             userFormData.username &&
//                             userFormData.email &&
//                             userFormData.password
//                         )
//                     }
//                 >
//                     Submit
//                 </Button>
//             </Form>

//             {/* Modal for signup success message */}
//             <Modal
//                 open={openModal}
//                 onClose={() => setOpenModal(false)} // Close modal
//                 size="small"
//             >
//                 <ModalHeader>You have signed up successfully</ModalHeader>
//                 <ModalContent>
//                     <p>{successMessage}</p>
//                 </ModalContent>
//                 <ModalActions>
//                     <Button
//                         onClick={() => setOpenModal(false)} // Close modal on click
//                         positive
//                     >
//                         Close
//                     </Button>
//                 </ModalActions>
//             </Modal>
//         </>
//     );
// };

// export default SignupForm;
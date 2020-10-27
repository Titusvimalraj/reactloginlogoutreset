import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import { motion } from 'framer-motion';
import classes from './Form.module.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import {
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Flex
} from "@chakra-ui/core";



const Form = ({ title, formTypeLogin, signin, signup, errorMessage, clearMessage }) => {
    const [inValidity, setFormValidity] = useState(true);


    const validateEmail = (value) => {
        const regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

        let error;
        if (!value) {
            error = "Email is required";
        } else if (!regex.test(value)) {
            error = "Email should be appropriate";
        }
        if (!error) {
            setFormValidity(false);
        } else {
            setFormValidity(true);
        }
        return error;
    }

    const validatePassword = (value) => {
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        let error;
        if (!value) {
            error = "Password is required";
        } else if (!regex.test(value)) {
            error = "Password does not meet the requirments";
        }

        if (!error) {
            setFormValidity(false);
        } else {
            setFormValidity(true);
        }

        return error;
    }

    const validatePasswordC = (password, value) => {
        // console.log('Cpass', password);

        let error;
        if (!value) {
            error = "Confirm Password is required";
        } else if (password !== value) {
            error = "Passwords do not match";
        }

        if (!error) {
            setFormValidity(false);
        } else {
            setFormValidity(true);
        }

        return error;
    }

    return (
        <Flex align="center" direction="column">
            <motion.div
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
            >
                <h1 className={classes.heading}>{title}</h1>
            </motion.div>

            <Formik
                initialValues={{ email: "", password: "", cpassword: "" }}
                onSubmit={(values, actions) => {
                    // console.log(actions);
                    // const formData = JSON.stringify(values, null, 2);
                    const formData = values;
                    // console.log(formData);
                    if (formTypeLogin) {
                        signin(formData);
                        actions.resetForm();
                        actions.setSubmitting(false);
                    } else {
                        signup(formData);
                        actions.resetForm();
                        actions.setSubmitting(false);
                    }
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     actions.setSubmitting(false);
                    // }, 1000);
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <Field name="email" validate={validateEmail}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input {...field} id="email" type="email" placeholder="user@gmail.com" />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password" validate={validatePassword}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Input {...field} id="password" type="password" />
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        {
                            !formTypeLogin ? <Field name="cpassword" validate={value => validatePasswordC(props.values.password, value)}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.cpassword && form.touched.cpassword}>
                                        <FormLabel htmlFor="cpassword">Confirm Password</FormLabel>
                                        <Input {...field} id="cpassword" type="password" />
                                        <FormErrorMessage>{form.errors.cpassword}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field> : null
                        }
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >

                            {formTypeLogin ? <Button
                                mt={4}
                                mb={4}
                                isLoading={props.isSubmitting}
                                type="submit"
                                variantColor="green"
                                isDisabled={props.isSubmitting || inValidity || Object.keys(props.errors).length > 0}
                            >Login</Button> : <Button mt={4} mb={4}
                                isLoading={props.isSubmitting}
                                type="submit"
                                isDisabled={props.isSubmitting || inValidity || Object.keys(props.errors).length > 0}
                                variantColor="green">Signup</Button>}
                        </motion.div>
                    </form>
                )}
            </Formik>

            {errorMessage ? <SweetAlert error onConfirm={clearMessage} title="Error!">
                {errorMessage}
            </SweetAlert> : null}

        </Flex>
    )
}

export default Form;




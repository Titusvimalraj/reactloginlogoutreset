import React, { useContext } from 'react';
import { Context as AuthContext } from "../../Context/AuthContext";
import classes from './ResetPassword.module.css';
import { Box, Flex } from '@chakra-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Input, Text, Button } from "@chakra-ui/core";
import SweetAlert from 'react-bootstrap-sweetalert';
const queryString = require('query-string');

export const ResetPassword = () => {
    const { state, clearMessage, resetPassword } = useContext(AuthContext);
    const { errorMessage, successMessage } = state;
    const location = useLocation();
    const { email, token } = queryString.parse(location.search);

    const validate = (values) => {
        const errors = {};
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        const { password, cpassword } = values;
        if (!password) {
            errors.password = "Required";
        }
        if (password && !regex.test(password)) {
            errors.password = "Password do not match requirements";
        }

        if (!cpassword) {
            errors.cpassword = "Required";
        }

        if (password && cpassword && password !== cpassword) {
            errors.cpassword = "Passwords Do no match";
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            cpassword: ''
        },
        validate,
        onSubmit: (values) => {
            resetPassword({ ...values, email, token });
        },
    });
    return (
        <Flex align="center" direction="column">

            <Box mt="2" p="5" shadow="md" borderWidth="1px" width={[
                "100%", // base
                "100%", // 480px upwards
                "50%", // 768px upwards
                "50%", // 992px upwards
            ]}>

                <Text fontSize={["xl", "4xl"]} m="5">ResetPassword Page!</Text>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="password">New Password</label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={formik.errors.password && formik.touched.password}
                        isRequired
                    />
                    <Text className={classes.error_message}>{formik.errors.password ? formik.errors.password : null}</Text>
                    <label htmlFor="cpassword">Confirm Password</label>

                    <Input
                        id="cpassword"
                        name="cpassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.cpassword}
                        isInvalid={formik.errors.cpassword && formik.touched.cpassword}
                        isRequired
                    />

                    <Text className={classes.error_message}>{formik.errors.cpassword ? formik.errors.cpassword : null}</Text>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button isLoading={formik.isSubmitting} m={5} variantColor="blue" variant="solid" type="submit">Reset</Button>
                    </motion.div>
                </form>
                <Link to="/auth">Back to Signin</Link>
            </Box>
            {errorMessage ? <SweetAlert error onConfirm={() => { clearMessage(); formik.setSubmitting(false); }} title="Error!">
                {errorMessage}
            </SweetAlert> : null}
            {successMessage ? <SweetAlert success onConfirm={() => { clearMessage(); formik.setSubmitting(false); }} title="Success!">
                {successMessage}
            </SweetAlert> : null}
        </Flex >

    )
}

export default ResetPassword

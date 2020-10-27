import React, { useContext } from 'react';
import { Context as AuthContext } from "../../Context/AuthContext";
import { Box, Flex } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Input, Text, Button } from "@chakra-ui/core";
import SweetAlert from 'react-bootstrap-sweetalert';

export const ForgetPassword = () => {
    const { state, clearMessage, forgotPassword } = useContext(AuthContext);
    const { errorMessage, successMessage } = state;

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: (values) => {
            forgotPassword(values);
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

                <Text fontSize={["xl", "4xl"]} m="5">ForgetPassword Page!</Text>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        isRequired
                    />
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button isLoading={formik.isSubmitting} m={5} variantColor="blue" variant="solid" type="submit">Submit</Button>
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

export default ForgetPassword

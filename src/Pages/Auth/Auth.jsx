import React, { useContext } from 'react';
import { Context as AuthContext } from "../../Context/AuthContext";
import { Link } from 'react-router-dom';
import { Box, Flex } from "@chakra-ui/core";
import { motion, AnimatePresence } from "framer-motion"
import Form from '../../Components/Form/Form';
const Auth = () => {
    const { state, switchToSignupPage, clearMessage, signin, signup } = useContext(AuthContext);
    const { auth, errorMessage } = state;

    return (
        <Flex align="center" direction="column">

            <Box mt="2" p="5" shadow="md" borderWidth="1px" width={[
                "100%", // base
                "100%", // 480px upwards
                "50%", // 768px upwards
                "50%", // 992px upwards
            ]}>
                <AnimatePresence>
                    {
                        auth ?
                            <motion.div initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}>
                                <Form title="Signin" formTypeLogin={auth} errorMessage={errorMessage} clearMessage={clearMessage} signin={signin} />
                            </motion.div>
                            :
                            <motion.div initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}>
                                <Form title="Sign up" formTypeLogin={auth} errorMessage={errorMessage} clearMessage={clearMessage} signup={signup} />
                            </motion.div>

                    }
                </AnimatePresence>
                <Flex align="center" direction="column">
                    <button className="btn btn-link" onClick={() => switchToSignupPage()}>{auth ? "Switch to Signup" : "Switch to Login"} </button>
                    <Link to="/forgotPassword">Forgot your password?</Link>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Auth;

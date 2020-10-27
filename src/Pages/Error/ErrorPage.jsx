import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Box, Button } from "@chakra-ui/core";
const queryString = require('query-string');


const ErrorPage = () => {
    const location = useLocation();
    const { message, error } = queryString.parse(location.search);
    const history = useHistory();
    return (
        <>
            <Box bg="#4287f5" w="100%" p={4} color="white">
                Error!
    <p>{message}</p>
                <p>{error}</p>
                <Button onClick={() => history.push('/auth')} rightIcon="arrow-forward" variantColor="teal">
                    go to Login
            </Button>
            </Box>
        </>
    )
};

export default ErrorPage;
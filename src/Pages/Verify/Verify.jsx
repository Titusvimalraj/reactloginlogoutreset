import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Button } from "@chakra-ui/core";



const Verify = () => {
    const { email } = useParams();
    const history = useHistory();
    return (
        <>
            <Box bg="#4287f5" w="100%" p={4} color="white">
                Verification Successful! Hope this is your Email {email}
                <Button onClick={() => history.push('/auth')} rightIcon="arrow-forward" variantColor="teal">
                    Go to Signin
            </Button>
            </Box>
        </>
    )
};

export default Verify;
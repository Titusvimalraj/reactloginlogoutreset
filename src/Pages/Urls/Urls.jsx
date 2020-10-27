import React, { useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Flex, Link, Icon, Button } from "@chakra-ui/core";
import CreateURLForm from '../../Components/CreateURLForm/CreateURLForm';
import { Context as UrlsContext } from "../../Context/UrlsContext";
import classes from './Urls.module.css';

export const Urls = () => {
    const { state, updateUrlsList, deleteUrl } = useContext(UrlsContext);
    const { urlsList } = state;

    // console.log(urlsList);
    useEffect(() => {
        updateUrlsList();
        // eslint-disable-next-line
    }, [])

    const MotionBox = motion.custom(Box);

    return (

        <AnimatePresence>
            <Flex align="center" direction="column" style={{ width: '100%' }}>
                <motion.div
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    style={{ width: '100%' }}
                >
                    <Box
                        mt="2" p="5" shadow="md" borderWidth="1px" width={[
                            "100%", // base
                            "100%", // 480px upwards
                            "50%", // 768px upwards
                            "50%", // 992px upwards
                        ]}
                    >
                        <CreateURLForm />
                    </Box>
                    <Flex className={classes.wrap}>
                        {
                            urlsList.map(url => {

                                return (
                                    <MotionBox
                                        key={url.urlId}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        mt="2" p="5" shadow="md" borderWidth="1px" bg="#34ebc3" width={['100%', 1 / 2, 1 / 4]} color="white" >
                                        <Flex align="center" direction="column">
                                            <Link fontSize={[16, 14, 12, 16, 18]} href={url.url} isExternal>{url.shortUrl}<Icon name="external-link" mx="2px" />
                                            </Link>
                                            <Button m={5} onClick={() => deleteUrl({ urlId: url.urlId })} color="black">Delete</Button>
                                        </Flex>
                                    </MotionBox>
                                )
                            })
                        }
                    </Flex>

                </motion.div>
            </Flex>

        </AnimatePresence>

    )
}

export default Urls

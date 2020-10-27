import React from 'react';
import {
    Accordion, Flex
} from "@chakra-ui/core";
import AccordItem from './AccordItem';

const Accord = ({ urls }) => {
    // console.log(urls);
    return (
        <Flex alignItems="center" w={['100%', '100%', '50%', '50%']}>
            <Accordion w="100%" allowMultiple>
                {
                    urls.map(urlEl => {
                        const { day, month, year } = urlEl._id;
                        const date = `${day}/${month}/${year}`;

                        return (
                            <AccordItem m="5" key={date} count={urlEl.count} date={date} urls={urlEl.urls} />
                        )
                    })
                }

            </Accordion>
        </Flex>
    )
}

export default Accord;
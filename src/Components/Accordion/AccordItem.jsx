import React from 'react';
import {
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    Icon,
    Box,
    Link,
    Flex
} from "@chakra-ui/core";
const AccordItem = ({ date, urls, count }) => {

    return (
        <>
            <AccordionItem>
                {({ isExpanded }) => (
                    <>
                        <AccordionHeader _expanded={{ bg: "#4FD1C5", color: "white" }}>
                            <Box flex="1" textAlign="left">
                                {date} - {count}
                            </Box>
                            <Icon size="12px" name={isExpanded ? "minus" : "add"} />
                        </AccordionHeader>
                        <AccordionPanel pb={4}>
                            <Flex alignItems="start" direction="column">
                                {
                                    urls.map((url) => (
                                        <span style={{ margin: 5 }}>
                                            <Link m="5" href={url.url}>{url.shortUrl}</Link>
                                            <Icon name="external-link" mx="2px" />
                                        </span>
                                    ))
                                }
                            </Flex>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </>
    )
}

export default AccordItem;

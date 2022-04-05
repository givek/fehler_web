import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';

function People(props) {
  return (
    <Box>
      <Box py="48px">
        <Text fontSize="26px">{props.title}</Text>
      </Box>
      <Stack direction="row" spacing="12">
        {props.people.map((person, index) => (
          <Box
            key={person.id}
            bgColor="white"
            w="120px"
            h="146px"
            boxShadow="md"
            borderRadius="md"
          >
            <Center h="100%">
              <Stack>
                <Center>
                  <Avatar
                    size="lg"
                    bg="green.300"
                    color="white"
                    name={`${person.first_name} ${person.last_name}`}
                  />
                </Center>
                <Flex mt={1} direction="column" alignItems="center">
                  <Text mt={3} fontSize="11px" fontWeight="normal">
                    {`${person.first_name} ${person.last_name}`}
                  </Text>
                  <Text m={1} fontSize="10px" fontWeight="normal">
                    Member
                  </Text>
                </Flex>
              </Stack>
            </Center>
          </Box>
        ))}
        <Button
          bgColor="white"
          w="120px"
          h="142px"
          boxShadow="md"
          borderRadius="md"
          // onClick={createProjectModalDisclosure.onOpen}
        >
          Add new
        </Button>
      </Stack>
    </Box>
  );
}

export default People;

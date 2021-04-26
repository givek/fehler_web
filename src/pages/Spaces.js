import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Heading, Stack, Text, Wrap, WrapItem } from '@chakra-ui/layout';
import React from 'react';
import { CreateSpaceModal } from '../components/modals/CreateSpaceModal';

export const Spaces = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px="56px" py="48px">
      <CreateSpaceModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Heading fontSize={['28px', '32px']} fontWeight="bold" color="#70bae7">
        Fehler
      </Heading>
      <Box px="110px" py="48px">
        <Wrap>
          <WrapItem>
            <Stack direction="row" alignItems="center" spacing="4">
              <Avatar size="lg" bg="#E87D65" name="Vivek Gandharkar" />
              <Text fontWeight="semibold">Vivek Gandharkar</Text>
            </Stack>
          </WrapItem>
        </Wrap>
        <Box py="48px">
          <Text fontSize="26px">Spaces you work in</Text>
        </Box>
        <Stack direction="row" spacing="12">
          <Box w="136px" h="104px" boxShadow="md" borderRadius="md">
            Tuna
          </Box>
          <Box w="136px" h="104px" boxShadow="md" borderRadius="md">
            Bacon
          </Box>
          <Button
            bgColor="#fff"
            w="136px"
            h="104px"
            boxShadow="md"
            borderRadius="md"
            onClick={onOpen}
          >
            Add new
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

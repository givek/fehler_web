import React from 'react';
import { Navbar } from '../components/Navbar';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Stack, Text, Wrap, WrapItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/react';
import { CreateIssueModal } from '../components/modals/CreateIssueModal';

export const People = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Navbar onOpen={onOpen} />
      <Box px="110px" py="48px">
        <Wrap>
          <WrapItem>
            <Stack direction="row" alignItems="center" spacing="4">
              <Avatar size="lg" bg="#E87D65" color="#fff" name="Tuna" />
              <Text fontWeight="semibold">Tuna</Text>
            </Stack>
          </WrapItem>
        </Wrap>
        <Box py="48px">
          <Text fontSize="26px">People</Text>
        </Box>
        <Stack direction="row" spacing="12">
          <Button w="112px" h="133px" boxShadow="md" borderRadius="md">
            Bucky Roberts
          </Button>
          <Button w="112px" h="133px" boxShadow="md" borderRadius="md">
            Send Invite
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

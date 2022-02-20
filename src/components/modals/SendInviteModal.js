import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalFooter,
} from '@chakra-ui/modal';
import { Button } from '@chakra-ui/button';
import { Formik, Form } from 'formik';
import { FormikControl } from './FormikControl';

export const SendInviteModal = props => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <Formik>
        <Form>
          <ModalContent>
            <ModalHeader fontWeight="medium">Invite your teammates</ModalHeader>
            <ModalBody>
              <FormikControl
                control="input"
                name="invite_email"
                label="Enter email"
                type="text"
                size="sm"
              />
            </ModalBody>
            <ModalFooter>
              <Button size="sm" variant="ghost" mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button size="sm" colorScheme="blue">
                Send
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Formik>
    </Modal>
  );
};

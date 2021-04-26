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
import { FormikControl } from '../FormikControl';

export const CreateSpaceModal = props => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <Formik>
        <Form>
          <ModalContent>
            <ModalHeader fontWeight="medium">
              Select your space name
            </ModalHeader>
            <ModalBody>
              <FormikControl
                control="input"
                type="text"
                name="name"
                label="Space name"
                size="sm"
                placeholder="Fehler"
                helpText="Choose something familiar like your team or company name."
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

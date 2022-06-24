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
import useAuthFehlerApi from '../../hooks/useAuthFehlerApi';

export const SendInviteModal = props => {
  const authFehlerApi = useAuthFehlerApi();

  const onSubmit = async (data = {}, { setErrors }) => {
    console.log(`form data`, data);

    try {
      const response = await authFehlerApi.post(
        `spaces/${props.spaceName}/invite/`,
        data
      );

      console.log(response);

      if (response) {
        props.onClose();
      }
    } catch (error) {
      // TODO: handle errors
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.data.name);
      }
      alert(error);
    }
  };

  const initialValues = { email: '' };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <ModalContent>
            <ModalHeader fontWeight="medium">Invite your teammates</ModalHeader>
            <ModalBody>
              <FormikControl
                control="input"
                name="email"
                label="Enter email"
                type="text"
                size="sm"
              />
            </ModalBody>
            <ModalFooter>
              <Button size="sm" variant="ghost" mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button type="submit" size="sm" colorScheme="blue">
                Send
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Formik>
    </Modal>
  );
};

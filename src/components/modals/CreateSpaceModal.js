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

const initialValues = {
  name: '',
};

export const CreateSpaceModal = props => {
  const authFehlerApi = useAuthFehlerApi();
  const onSumbit = async (data = {}, { setErrors }) => {
    console.log(`form data`, data.name);

    try {
      const response = await authFehlerApi.post(`create-space/`, {
        name: data.name,
        owner: props.user.email,
      });

      console.log(response);

      if (response) {
        props.setSpaces(response.data);
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
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <Formik initialValues={initialValues} onSubmit={onSumbit}>
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
              <Button type="submit" size="sm" colorScheme="blue">
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Formik>
    </Modal>
  );
};

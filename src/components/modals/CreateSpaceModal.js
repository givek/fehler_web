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

const initialValues = {
  name: '',
};

export const CreateSpaceModal = props => {
  const onSumbit = async (data = {}, { setErrors }) => {
    console.log(data);
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: data.name, owner: props.user.email }),
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/create_space`,
        requestOptions
      );

      if (response.ok) {
        const res = await response.json();
        console.log(res);
      } else {
        const res = await response.json();
        console.error(res);
      }
    } catch (error) {
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
              <Button type='submit' size="sm" colorScheme="blue">
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Formik>
    </Modal>
  );
};

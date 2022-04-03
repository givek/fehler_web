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
import { Stack } from '@chakra-ui/layout';
import useAuthFehlerApi from '../../hooks/useAuthFehlerApi';

const initialValues = {
  project_name: '',
  project_description: '',
};

export const CreateProjectModal = props => {
  const authFehlerApi = useAuthFehlerApi();
  const onSubmit = async (data = {}, { setErrors }) => {
    console.log(`form data`, data);

    try {
      // TODO: current space id is hardcoded, make it variable.
      const response = await authFehlerApi.post(
        `${props.spaceName}/create-project/`,
        {
          name: data.project_name,
          // owner: props.user.email,
          // space: 1,
        }
      );

      console.log(response);

      if (response) {
        props.setProjects(response.data);
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
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        <Form>
          <ModalContent>
            <ModalHeader fontWeight="medium">Create a new project.</ModalHeader>
            <ModalBody>
              <Stack spacing={4}>
                <FormikControl
                  control="input"
                  name="project_name"
                  label="Project Name"
                  type="text"
                  size="sm"
                />
                <FormikControl
                  control="textarea"
                  name="project_description"
                  label="Description"
                  size="sm"
                />
              </Stack>
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

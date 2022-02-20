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

const initialValues = {
  name: '',
};

export const CreateProjectModal = props => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <Formik initialValues={initialValues}>
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
              <Button size="sm" colorScheme="blue">
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Formik>
    </Modal>
  );
};

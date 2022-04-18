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
import { useQueryClient } from 'react-query';

function AddProjectMemberModal(props) {
  const authFehlerApi = useAuthFehlerApi();
  const queryClient = useQueryClient();

  const onSubmit = async (data = {}, { setErrors }) => {
    console.log(`form data`, data);

    try {
      const response = await authFehlerApi.post(
        `add_project_member/${props.spaceName}/${props.projectName}/`,
        data
      );

      console.log(response);

      if (response) {
        props.onClose();
        queryClient.invalidateQueries(
          'project-members',
          props.spaceName,
          props.projectName
        );
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

  const spaceMemberOptions = props.spaceMembers.map(spaceMember => ({
    key: `${spaceMember.first_name} ${spaceMember.last_name}`,
    value: spaceMember.email,
  }));

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <ModalContent>
            <ModalHeader fontWeight="medium">Add new member</ModalHeader>
            <ModalBody>
              <FormikControl
                control="select"
                name="email"
                label="Add to project"
                options={spaceMemberOptions}
                size="sm"
              />
            </ModalBody>
            <ModalFooter>
              <Button size="sm" variant="ghost" mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button type="submit" size="sm" colorScheme="blue">
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Formik>
    </Modal>
  );
}

export default AddProjectMemberModal;

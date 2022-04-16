import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  Button,
  Stack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FormikControl } from '../FormikControl';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import useAuthFehlerApi from '../../hooks/useAuthFehlerApi';

function fetchProjectMembers(spaceName, projectName, token) {
  return axios.get(
    `http://127.0.0.1:8000/api/${spaceName}/${projectName}/project-members/`,
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
}

function RiskDetailsModal(props) {
  const userToken = localStorage.getItem('userToken');
  const projectMembers = useQuery(['project-members', props.spaceName], () =>
    fetchProjectMembers(props.spaceName, props.projectName, userToken)
  );

  const projectNameOptions = props.projects.map(project => ({
    key: project.name,
    value: project.id,
  }));

  const issueReporter = [
    {
      key: `${props.user.first_name} ${props.user.last_name}`,
      value: props.user.id,
    },
  ];

  const likelihood = [
    { key: 'Very High', value: 'VH' },
    { key: 'High', value: 'H' },
    { key: 'Medium', value: 'M' },
    { key: 'Low', value: 'L' },
    { key: 'Very Low', value: 'VL' },
  ];

  const impact = [
    { key: 'Very High', value: 'VH' },
    { key: 'High', value: 'H' },
    { key: 'Medium', value: 'M' },
    { key: 'Low', value: 'L' },
    { key: 'Very Low', value: 'VL' },
  ];

  const ownerList = projectMembers.data?.data?.map(projectMember => ({
    key: `${projectMember.first_name} ${projectMember.last_name}`,
    value: projectMember.id,
  }));

  const authFehlerApi = useAuthFehlerApi();
  const queryClient = useQueryClient();

  async function onSubmit(data = {}, { setErrors }) {
    console.log('risk modal', JSON.stringify(data));

    try {
      const response = await authFehlerApi.put(`${data.id}/update-risk/`, data);

      console.log(response);

      if (response) {
        // props.setProjects(response.data);
        props.onClose();
        queryClient.invalidateQueries('risks');
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
  }

  return (
    <Modal size="xl" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <Formik
        initialValues={props.risk}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <ModalContent>
            <ModalHeader fontWeight="medium">Update risk</ModalHeader>
            <ModalBody>
              <Stack spacing={4}>
                <FormikControl
                  control="input"
                  name="name"
                  label="Name"
                  size="sm"
                />

                <FormikControl
                  control="select"
                  name="project"
                  label="Project"
                  options={projectNameOptions}
                  disabled="disabled"
                  size="sm"
                />

                <FormikControl
                  control="textarea"
                  name="description"
                  label="Description"
                  size="sm"
                />

                <FormikControl
                  control="select"
                  name="reporter"
                  label="Reporter"
                  options={issueReporter}
                  disabled="disabled"
                  size="sm"
                />

                <FormikControl
                  control="select"
                  name="probability"
                  label="Probability"
                  options={likelihood}
                  size="sm"
                />

                <FormikControl
                  control="select"
                  name="impact"
                  label="Impact"
                  options={impact}
                  size="sm"
                />

                <FormikControl
                  control="select"
                  name="owner"
                  label="Owner"
                  options={ownerList}
                  size="sm"
                />

                <FormikControl
                  control="textarea"
                  name="mitigation_action"
                  label="Mitigation Action"
                  size="sm"
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button size="sm" variant="ghost" mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button type="submit" size="sm" colorScheme="blue">
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Formik>
    </Modal>
  );
}

export default RiskDetailsModal;

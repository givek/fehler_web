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
import { useQuery, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const issueTypeOptions = [{ key: 'Frontend', value: 'frontend' }];

const priorityLevel = [
  { key: 'Urgent', value: 4 },
  { key: 'High', value: 3 },
  { key: 'Medium', value: 2 },
  { key: 'Low', value: 1 },
];

const issueLabels = [{ key: 'Bug', value: 'bug' }];

// prevent form submission on enter
function onKeyDown(keyEvent) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}
const validationSchema = Yup.object({
  tags: Yup.array().max(3),
});

function fetchProjectMembers(spaceName, token) {
  return axios.get(`http://127.0.0.1:8000/api/${spaceName}/space-members/`, {
    headers: { Authorization: `Token ${token}` },
  });
}

// When `Kanban` page is directly accessed with url, state object (state: { id: project.id, projectName: project.name }) is not passed through router.
export const CreateIssueModal = props => {
  const params = useParams();

  console.log(props.user.email);
  const firstProject = props.projects[0];

  const userToken = localStorage.getItem('userToken');
  const spaceMembers = useQuery(['space-members', props.spaceName], () =>
    fetchProjectMembers(props.spaceName, userToken)
  );

  const projectNameOptions = props.projects.map(project => ({
    key: project.name,
    value: project.id,
  }));

  console.log(projectNameOptions);

  const issueReporter = [
    {
      key: `${props.user.first_name} ${props.user.last_name}`,
      value: props.user.id,
    },
  ];
  const issueAssigneeList = spaceMembers.data?.data?.map(spaceMember => ({
    key: `${spaceMember.first_name} ${spaceMember.last_name}`,
    value: spaceMember.id,
  }));

  const initialValues = {
    name: '',
    project: firstProject ? firstProject.id : '',
    priority: 1,
    description: '',
    // issue_type: '',
    // issue_assignee: '',
    tags: [],
    reporter: props.user.id,
    assignee: '',
    date_due: '',
  };

  const authFehlerApi = useAuthFehlerApi();
  const queryClient = useQueryClient();

  const onSubmit = async (data = {}, { setErrors }) => {
    console.log(`form data`, data);

    const project = props.projects.filter(
      project => project.id === parseInt(data.project)
    );

    try {
      const response = await authFehlerApi.post(
        `${params.spaceName}/${project.name}/create_task/`,
        data
      );

      console.log(response);

      if (response) {
        // props.setProjects(response.data);
        props.onClose();
        queryClient.invalidateQueries('tasks');
        queryClient.invalidateQueries(
          params.spaceName,
          project.name,
          'columns'
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

  return (
    <Modal size="xl" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form onKeyDown={onKeyDown}>
          <ModalContent>
            <ModalHeader fontWeight="medium">Create a new issue</ModalHeader>
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
                  name="priority"
                  label="Priority"
                  options={priorityLevel}
                  size="sm"
                />

                <FormikControl
                  control="tag-input"
                  name="tags"
                  label="Tags"
                  size="sm"
                />

                {/* <FormikControl
                  control="select"
                  name="issue_type"
                  label="Issue Type"
                  options={issueTypeOptions}
                  size="sm"
                />

                <FormikControl
                  control="select"
                  name="issue_assignee"
                  label="Assignee"
                  options={issueAssigneeList} // projectMemberList
                  size="sm"
                />
                <FormikControl
                  control="select"
                  name="issue_labels"
                  label="Labels"
                  options={issueLabels}
                  size="sm"
                /> */}

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
                  name="assignee"
                  label="Assignee"
                  options={issueAssigneeList}
                  size="sm"
                />

                <FormikControl
                  control="date"
                  name="date_due"
                  label="Due Date"
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

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
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

const issueTypeOptions = [{ key: 'Frontend', value: 'frontend' }];

const priorityLevel = [
  { key: 'Urgent', value: 4 },
  { key: 'High', value: 3 },
  { key: 'Medium', value: 2 },
  { key: 'Low', value: 1 },
];

const issueAssigneeList = [{ key: 'Jon Doe', value: 'jon@email.com' }];
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
// When `Kanban` page is directly accessed with url, state object (state: { id: project.id, projectName: project.name }) is not passed through router.
export const CreateIssueModal = props => {
  console.log(props.user.email);

  console.log('project', props.projects);

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

  const initialValues = {
    name: '',
    project: 0,
    priority: 1,
    description: '',
    // issue_type: '',
    // issue_assignee: '',
    tags: [],
    reporter: props.user.id,
    date_due: '',
  };

  const authFehlerApi = useAuthFehlerApi();
  const queryClient = useQueryClient();

  const onSubmit = async (data = {}, { setErrors }) => {
    console.log(`form data`, data);

    try {
      const response = await authFehlerApi.post(
        `MeowSpace/Tuna/create_task/`,
        data
      );

      console.log(response);

      if (response) {
        // props.setProjects(response.data);
        queryClient.invalidateQueries('tasks');
        queryClient.invalidateQueries('MeowSpace', 'Tuna', 'columns');
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

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
import { Select } from '@chakra-ui/select';

const issueTypeOptions = [{ key: 'Frontend', value: 'frontend' }];
const projectNameOptions = [
  { key: 'Bacon Project', value: 'bacon_project' },
  { key: 'Tuna Project', value: 'tuna_project' },
];
const issueAssigneeList = [{ key: 'Jon Doe', value: 'jon@email.com' }];
const issueLabels = [{ key: 'Bug', value: 'bug' }];
const issueReporter = [{ key: 'Vivek Gandharkar', value: 'vivekg@email.com' }];

export const CreateIssueModal = props => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <Formik>
        <Form>
          <ModalContent>
            <ModalHeader fontWeight="medium">Create a new issue</ModalHeader>
            <ModalBody>
              <Stack spacing={4}>
                <FormikControl
                  control="select"
                  name="project"
                  label="Project"
                  options={projectNameOptions}
                  size="sm"
                />
                <FormikControl
                  control="select"
                  name="issue_type"
                  label="Issue Type"
                  options={issueTypeOptions}
                  size="sm"
                />
                <FormikControl
                  control="textarea"
                  name="issue_description"
                  label="Description"
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
                />
                <FormikControl
                  control="select"
                  name="issue_reporter"
                  label="Reporter"
                  options={issueReporter}
                  disabled="disabled"
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

import React from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

function fetchTasks(token, spaceName) {
  return axios.get(`http://127.0.0.1:8000/api/${spaceName}/space-tasks/`, {
    headers: { Authorization: `Token ${token}` },
  });
}

function TasksTable(props) {
  const params = useParams();

  const userToken = localStorage.getItem('userToken');
  const query = useQuery(['tasks', userToken, params.spaceName], () =>
    fetchTasks(userToken, params.spaceName)
  );

  if (query.isLoading) {
    return <div>Loading....</div>;
  }

  // const tasks = query.data?.data.filter(task => column.tasks.includes(task.id));
  const tasks = query.data?.data;

  console.log(tasks);

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Status</Th>
          <Th>Assign</Th>
          <Th>Due Date</Th>
          <Th>Date Created</Th>
        </Tr>
      </Thead>
      <Tbody fontSize="14px" textTransform="capitalize">
        {tasks.map(task => (
          <Tr key={task.id}>
            <Td>{task.name}</Td>
            <Td>{task.column_title}</Td>
            <Td>{task.assignee_name}</Td>
            <Td>
              {new Date(task.date_due).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Td>
            <Td>
              {new Date(task.date_created).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>{/* Add new Task */}</Tfoot>
    </Table>
  );
}

export default TasksTable;

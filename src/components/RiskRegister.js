import React from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function fetchRisks(token, spaceName, projectName) {
  return axios.get(
    `http://127.0.0.1:8000/api/${spaceName}}/${projectName}/risks/`,
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
}

function RiskRegister(props) {
  const params = useParams();

  const userToken = localStorage.getItem('userToken');
  const query = useQuery(
    ['risks', userToken, params.spaceName, params.projectName],
    () => fetchRisks(userToken, params.spaceName, params.projectName)
  );

  if (query.isLoading) {
    return <div>Loading....</div>;
  }

  // const tasks = query.data?.data.filter(task => column.tasks.includes(task.id));
  const risks = query.data?.data;

  console.log(risks);

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>Date Created</Th>
          <Th>Description</Th>
          <Th>Likelihood</Th>
          <Th>Impact</Th>
          <Th>Severity</Th>
          <Th>Owner</Th>
          <Th>Mitigating Action</Th>
        </Tr>
      </Thead>
      <Tbody fontSize="14px" textTransform="capitalize">
        {risks.map(risk => (
          <Tr key={risk.id}>
            <Td>{risk.id}</Td>
            <Td>
              {new Date(risk.date_created).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Td>
            <Td>{risk.description}</Td>
            <Td>{risk.probability}</Td>
            <Td>{risk.impact}</Td>
            <Td>{risk.severity}</Td>
            <Td>{risk.owner}</Td>
            <Td>{risk.mitigation_action}</Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>{/* Add new Task */}</Tfoot>
    </Table>
  );
}

export default RiskRegister;

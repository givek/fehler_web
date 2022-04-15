import React from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function RiskRegister(props) {
  const risks = props.risks;

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
          <Tr
            key={risk.id}
            onClick={() => {
              props.setClickedTask(risk);
              props.onOpen();
            }}
          >
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

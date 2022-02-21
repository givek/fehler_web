import React from 'react';
import { Box, Button, Heading, Stack, useDisclosure } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

import { CreateIssueModal } from './modals/CreateIssueModal';

function fetchTasks(boardId) {
  return axios.get(
    `http://127.0.0.1:8000/api/MeowSpace/Tuna/${boardId}/tasks/`
  );
}

function Column({ column }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const query = useQuery(['tasks', column.board], () =>
    fetchTasks(column.board)
  );

  if (query.isLoading) {
    return <div>Loading....</div>;
  }

  // const tasks = query.data?.data.filter(task => column.tasks.includes(task.id));
  const tasks = query.data?.data;

  // const tasks = column.tasks.

  // const tasks = query.data?.data.filter(task =>
  //   task.column === column.id ? task : null
  // );

  // console.log('tasks', tasks);

  return (
    <Box p={3} w={296} bgColor="#EFF1F2" borderRadius="md">
      <CreateIssueModal
        // pass setProjects function down to modal component, so it can update projects state.
        // setProjects={setProjects}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      <Heading
        fontFamily="Montserrat"
        mb="3"
        size="md"
        textTransform="capitalize"
        fontSize="16px"
        fontWeight="medium"
      >
        {column.title}
      </Heading>
      <Stack spacing={4}>
        <Droppable droppableId={`column-${column.id}`}>
          {(provided, snapshot) => (
            <Stack
              spacing={4}
              transition={('bgColor', '0.2s', 'ease-in')}
              bgColor={snapshot.isDraggingOver ? 'gray.100' : null}
              ref={provided.innerRef} // used to supple the DOM node our component to react-beautifull-dnd
              {...provided.droppableProps}
            >
              {column.tasks.map((taskId, index) => (
                <Task
                  key={taskId}
                  task={tasks[tasks.findIndex(task => task.id === taskId)]}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
        <Button onClick={onOpen}>Add new</Button>
      </Stack>
    </Box>
  );
}

export default Column;

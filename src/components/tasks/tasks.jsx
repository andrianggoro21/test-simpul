import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Checkbox,
  Badge,
  IconButton,
  Divider,
  Input,
  Button,
  Select,
  Spinner
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const data = response.data;
        const formattedTasks = data.slice(0, 10).map((item) => ({
          id: item.id,
          title: item.title,
          dueDate: new Date().toLocaleDateString(),
          daysLeft: Math.floor(Math.random() * 10),
          description: item.title,
          completed: item.completed,
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  if (loading) {
    return (
      <Box
        position="fixed"
        top="80px"
        right="20px"
        width="734px"
        height="80vh"
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="lg"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      position="fixed"
      top="80px"
      right="20px"
      width="734px"
      height="80vh"
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="lg"
      overflowY="auto"
    >
      <VStack spacing={4}>
        <HStack w="100%">
          <Input placeholder="Search Tasks" />
          <IconButton icon={<FaSearch />} colorScheme="blue" />
          <Button colorScheme="blue">New Task</Button>
          <Select placeholder="Filter Tasks" width="200px">
            <option value="personal">Personal Errands</option>
            <option value="urgent">Urgent To-Do</option>
          </Select>
        </HStack>
        <VStack spacing={0} w="100%">
          {tasks.map((task, index) => (
            <Box key={task.id} w="100%">
              <HStack
                p={4}
                bg="gray.50"
                w="100%"
                borderRadius="md"
                spacing={4}
                alignItems="start"
                cursor="pointer"
              >
                <Checkbox
                  isChecked={task.completed}
                  onChange={() => handleCompleteTask(task.id)}
                />
                <Box flex="1">
                  <HStack justifyContent="space-between">
                    <Text fontWeight="bold">{task.title}</Text>
                    <Text fontSize="sm" color="gray.500">{task.dueDate}</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme={task.daysLeft <= 2 ? "red" : task.daysLeft <= 4 ? "yellow" : "green"}>
                      {task.daysLeft} Days Left
                    </Badge>
                    <Text color="gray.600">{task.description}</Text>
                  </HStack>
                </Box>
                <IconButton icon={<FaEdit />} aria-label="Edit task" />
                <IconButton icon={<FaTrash />} aria-label="Delete task" />
              </HStack>
              {index < tasks.length - 1 && <Divider />}
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default TaskManager;


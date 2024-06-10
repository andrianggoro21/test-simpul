import { useState, useEffect } from 'react';
import { Box, Input, VStack, HStack, Text, Avatar, IconButton, Divider, Spinner } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import ChatRoom from './ChatRoom';
import axios from 'axios';

const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        const data = response.data;
        const formattedMessages = data.slice(0, 10).map((item) => ({
          id: item.id,
          sender: item.email,
          subject: item.name,
          preview: item.body,
          date: new Date().toLocaleDateString(),
          unread: Math.random() > 0.5,
          content: item.body
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleClick = (message) => {
    setSelectedMessage(message);
  };

  const handleBack = () => {
    setSelectedMessage(null);
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

  if (selectedMessage) {
    return (
      <ChatRoom message={selectedMessage} onBack={handleBack} />
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
          <Input placeholder="Search" />
          <IconButton
            icon={<FaSearch />}
            colorScheme="blue"
          />
        </HStack>
        <VStack spacing={0} w="100%">
          {messages.map((message, index) => (
            <Box key={message.id} w="100%">
              <HStack
                p={4}
                bg="gray.50"
                w="100%"
                borderRadius="md"
                spacing={4}
                alignItems="start"
                cursor="pointer"
                onClick={() => handleClick(message)}
              >
                <Avatar name={message.sender} />
                <Box flex="1">
                  <HStack justifyContent="space-between">
                    <Text fontWeight="bold">{message.sender}</Text>
                    <Text fontSize="sm" color="gray.500">{message.date}</Text>
                  </HStack>
                  <Text color="gray.600">{message.subject}</Text>
                  <Text color="gray.600">{message.preview}</Text>
                </Box>
                {message.unread && <Box bg="red.500" borderRadius="full" w="8px" h="8px" />}
              </HStack>
              {index < messages.length - 1 && <Divider />}
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Inbox;

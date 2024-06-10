import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  IconButton,
  Divider,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import PropTypes from "prop-types";
import axios from 'axios';

const ChatRoom = ({ message, onBack }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const data = response.data;
        const formattedMessages = data.slice(0, 10).map((item, index) => ({
          id: item.id,
          sender: index % 2 === 0 ? "You" : "User",
          content: item.body,
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
          isUser: index % 2 === 0,
        }));
        setChatMessages(formattedMessages);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChatMessages();
  }, []);

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
      <VStack h="full" spacing={4} justifyContent="space-between">
        <Box w="100%">
          <HStack w="100%" alignItems="center">
            <IconButton icon={<FaArrowLeft />} onClick={onBack} />
            <Text fontWeight="bold" flex="1" textAlign="center">
              {message.sender}
            </Text>
          </HStack>
          {chatMessages.map((chatMessage, index) => (
            <Box key={chatMessage.id} w="100%" p={4}>
              {index === 0 && (
                <>
                  <Divider />
                  <Text textAlign="center" color="gray.500" mb={2} mt={2}>
                    Today {chatMessage.date}
                  </Text>
                  <Divider />
                </>
              )}
              <HStack
                alignItems="flex-start"
                spacing={4}
                w="100%"
                justifyContent={
                  chatMessage.isUser ? "flex-end" : "flex-start"
                }
              >
                {!chatMessage.isUser && <Avatar name={chatMessage.sender} />}
                <Box
                  flex="1"
                  bg={chatMessage.isUser ? "blue.100" : "gray.100"}
                  p={4}
                  borderRadius="md"
                >
                  <HStack justifyContent="space-between">
                    <Text fontWeight="bold">{chatMessage.sender}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {chatMessage.time}
                    </Text>
                  </HStack>
                  <Text color="gray.600">{chatMessage.content}</Text>
                </Box>
                {chatMessage.isUser && <Avatar name="You" />}
              </HStack>
            </Box>
          ))}
        </Box>
        <HStack w="100%" p={4}>
          <Input placeholder="Type a new message" />
          <Button colorScheme="blue">Send</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

ChatRoom.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.string.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ChatRoom;

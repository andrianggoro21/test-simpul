import { Box } from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <Box
      width="250px"
      bg="#4F4F4F"
      color="white"
      p={4}
      borderRight="1px solid #E0E0E0"
    >
      {/* <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold">
          Inbox
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          Task
        </Text>
      </VStack> */}
    </Box>
  );
};

export default Sidebar;

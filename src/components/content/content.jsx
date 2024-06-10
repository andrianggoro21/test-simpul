import { Box, IconButton, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Content = () => {
  return (
    <Box flex="1">
      <Box
      display="flex"
      alignItems="center"
      padding="2"
      bg="#828282" // Sesuaikan warna latar belakang sesuai kebutuhan
      w='full'
      position="fixed"
      top="0"
      zIndex="1"
    >
      <IconButton
        icon={<FaSearch />}
        aria-label="Search"
        colorScheme="gray"
        color="white"
        marginRight="2"
        bg="transparent"
        _hover={{ bg: "#828282" }}
      />
      <Input
        placeholder="Search..."
        color="white"
        bg="#828282"
        borderColor="#828282"
        _hover={{ borderColor: "#828282" }}
      />
    </Box>
    </Box>
  );
};

export default Content;

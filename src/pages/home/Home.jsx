import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import Sidebar from "../../components/sidebar/sidebar";
import Content from "../../components/content/content";
import { useState } from "react";
import { motion } from "framer-motion";
import Inbox from "../../components/inbox/inbox";
import TaskManager from "../../components/tasks/tasks";
import mainIcon from "../../assets/icons/main.png";
import taskCloseIcon from "../../assets/icons/taskClose.png";
import inboxCloseIcon from "../../assets/icons/inboxClose.png";
import taskOpenIcon from "../../assets/icons/taskOpen.png";
import inboxOpenIcon from "../../assets/icons/inboxOpen.png";

const MotionBox = motion(Box);

const Home = () => {
  const [showIcons, setShowIcons] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  const toggleIcons = () => {
    setShowIcons(!showIcons);
    setShowInbox(false);
    setShowTasks(false);
  };

  const toggleInbox = () => {
    if (showInbox) {
      setShowInbox(false);
      setShowIcons(false);
    } else if (showTasks) {
      setShowTasks(false);
      setShowInbox(true);
    } else {
      setShowInbox(true);
    }
  };

  const toggleTasks = () => {
    if (showTasks) {
      setShowTasks(false);
      setShowIcons(false);
    } else if (showInbox) {
      setShowInbox(false);
      setShowTasks(true);
    } else {
      setShowTasks(true);
    }
  };

  return (
    <Box className="inti" w="100vw" h="100vh" bg="#4F4F4F">
      <Flex height="100vh">
        <Sidebar />
        <Content />
        {showInbox && <Inbox />}
        {showTasks && <TaskManager />}
        <Box position="fixed" bottom="20px" right="20px">
          <HStack spacing={4}>
            {showIcons && (
              <MotionBox
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <HStack spacing={4}>
                  <Image
                    src={showInbox? inboxOpenIcon : inboxCloseIcon}
                    onClick={toggleInbox}
                    cursor="pointer"
                    boxSize="60px"
                  />
                  <Image
                    src={showTasks? taskOpenIcon : taskCloseIcon}
                    onClick={toggleTasks}
                    cursor="pointer"
                    boxSize="60px"
                  />
                </HStack>
              </MotionBox>
            )}
            <Image
              src={mainIcon}
              onClick={toggleIcons}
              cursor="pointer"
              boxSize="60px"
            />
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;

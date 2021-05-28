import { Flex, Text, Box, Avatar } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({showProfileData = true}: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
      <Box>
        <Text>Igor Cunha</Text>
        <Text color="gray.300" fontSize="small">igorccunha@hotmail.com</Text>
      </Box>)}

      <Avatar size="md" name="Igor Cunha" src="https://github.com/iigorcunha.png" />

    </Flex>
  );
}
import { Box, Button, Flex, Heading, Icon, Table, Text, Thead, Tr, Th, Td, Checkbox, Tbody, useBreakpointValue } from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
      <Sidebar />
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">Users</Heading>
          <Link href="/users/create" passHref>
          <Button 
            as="a" 
            size="sm" 
            fontSize="smal" 
            colorScheme="pink"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
            Create user
          </Button>
          </Link>
        </Flex>
      
        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th px={["4", "4", "6"]} color="gray.300" w="8">
                <Checkbox colorScheme="pink" />
              </Th>
              <Th>
                User
              </Th>
              {isWideVersion && (
                <Th>
                Register date
              </Th>
              )}
              {isWideVersion && <Th w="8" />}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td px={["4", "4", "6"]}>
                <Checkbox colorScheme="pink" />
              </Td>
              <Td>
                <Box>
                  <Text fontWeight="bold">Igor Cunha</Text>
                  <Text fontSize="sm" color="gray.300">igorccunha@hotmail.com</Text>
                </Box>
              </Td>
              {isWideVersion && (
                <Td>
                May 28, 2021
              </Td>
              )}
              {isWideVersion && (
                <Td>
                <Button 
                  as="a" 
                  size="sm" 
                  fontSize="smal" 
                  colorScheme="purple"
                  leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                  >
                  Edit
                </Button>
                </Td>
              )}
            </Tr>
          </Tbody>
        </Table>

        <Pagination />
      </Box>
      </Flex>
    </Box>
  );
}
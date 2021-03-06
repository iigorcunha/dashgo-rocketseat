import { 
  Box, 
  Button, 
  Flex,
  Link, 
  Heading, 
  Icon, 
  Table, 
  Text, 
  Thead, 
  Tr, 
  Th, 
  Td,
  Checkbox, 
  Tbody, 
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import NextLink from 'next/link';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';
import { useUsers } from '../../services/hooks/useUsers';
import { useState } from 'react';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching } = useUsers(page);
  
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data;
    }, { 
      staleTime: 1000 * 60 * 10 // 10 minutes
    })
  }


  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
      <Sidebar />
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Users { !isLoading && isFetching && <Spinner size="sm"color="gray.500" ml="4" />}
          </Heading>
          <NextLink href="/users/create" passHref>
          <Button 
            as="a" 
            size="sm" 
            fontSize="smal" 
            colorScheme="pink"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
            Create user
          </Button>
          </NextLink>
        </Flex>
      
        { isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ): (error) ? (
          <Flex justify="center">
              <Text>Falha ao obter dados do usuario</Text>
          </Flex>
        ) : (
          <>
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
            {data.users.map(user => (
              <Tr key={user.id}>
              <Td px={["4", "4", "6"]}>
                <Checkbox colorScheme="pink" />
              </Td>
              <Td>
                <Box>
                  <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                    <Text fontWeight="bold">{user.name}</Text>
                  </Link>
                  <Text fontSize="sm" color="gray.300">{user.email}</Text>
                </Box>
              </Td>
              {isWideVersion && (
                <Td>
                {user.createdAt}
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
            ))}
          </Tbody>
        </Table>

        <Pagination
          totalCountOfRegisters={data.totalCount}
          currentPage={page}
          onPageChange={setPage}
        />
          </>
        )}
      </Box>
      </Flex>
    </Box>
  );
}
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Sidebar } from '../../components/Sidebar';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
157
const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Name required!'),
  email: yup.string().required('E-mail required!').email('Invalid E-mail!'),
  password: yup.string().required('Password required!').min(6, 'Minimum of 6 characters'),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ])
})

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })



  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(values);
  }
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
      <Sidebar />
      <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} onSubmit={handleSubmit(handleCreateUser)}>
        <Heading size="lg" fontWeight="normal">Create user</Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input name="name" label="Full name" type="text" {...register('name')} error={errors.name}/>
            <Input name="email" label="E-mail" type="email" {...register('email')} error={errors.email} />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input name="password" label="Password" type="password" {...register('password')} error={errors.password}/>
            <Input name="password_confirmation" label="Password confirmation" type="password"  {...register('password_confirmation')} error={errors.password_confirmation}/>
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Link href="/users" passHref><Button colorScheme="whiteAlpha">Cancelar</Button></Link>
            <Button isLoading={formState.isSubmitting} colorScheme="pink" type="submit">Salvar</Button>
          </HStack>
        </Flex>
      </Box>
      </Flex>
    </Box>
  );
}
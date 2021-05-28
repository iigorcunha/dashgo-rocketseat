import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail required!').email('Invalid E-mail!'),
  password: yup.string().required('Password required!')
})

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 20000))
    
    console.log(values);
  }
  return (
    <Flex 
      w="vw" 
      h="100vh" 
      align="center" 
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input error={errors.email} name="email" label="email" type="email" {...register('email')} />
        
        <Input 
          name="password" 
          type="password"
          label="senha"
          error={errors.password}
          {...register('password')}
          />
        </Stack>

        <Button  isLoading={formState.isSubmitting} size="lg" type="submit" mt="6" colorScheme="pink">
          Entrar
        </Button>
      </Flex>
    </Flex>
    
  )
}

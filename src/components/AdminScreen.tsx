import { Flex, Box, VStack, FormControl, FormLabel, Input, Button, Text, IconButton } from "@chakra-ui/react";
import {TrashIcon, PencilIcon} from '@phosphor-icons/react'

function PublicScreen() {
    return(
      <Box minH="100vh" bg="#234E52" p={8} color="white" >
      <Box
        bg="white"
        marginTop="8rem" 
        color="#234E52"
        maxW="600px"
        mx="auto"
        p={8}
        rounded="md"
        boxShadow="lg"
      >
        <VStack spacing={4} as="form">
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <Input placeholder="Digite seu nome" focusBorderColor="#38B2AC" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Sobrenome</FormLabel>
            <Input
              placeholder="Digite seu sobrenome"
              focusBorderColor="#38B2AC"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              focusBorderColor="#38B2AC"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Digite sua senha"
              focusBorderColor="#38B2AC"
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Cadastrar
          </Button>
        </VStack>
      </Box>

      {/* Lista de usuários cadastrados */}
      <VStack mt={10} spacing={4}>
        <Box
          bg="white"
          color="#234E52"
          p={4}
          rounded="md"
          boxShadow="md"
          width="100%"
          maxW="600px"
          position="relative"
        >
          <Text fontWeight="bold">Nome Sobrenome</Text>
          <Text>email@exemplo.com</Text>

          <Flex position="absolute" top={2} right={2} gap={2}>
            <IconButton
              aria-label="Editar"
              icon={<TrashIcon size={20} />}
              variant="ghost"
              color="#234E52"
              _hover={{ bg: "#E6FFFA" }}
            />
            <IconButton
              aria-label="Excluir"
              icon={<PencilIcon size={20} />}
              variant="ghost"
              color="red.600"
              _hover={{ bg: "#E6FFFA" }}
            />
          </Flex>
        </Box>

        {/* Repita <Box> acima para cada usuário depois */}
      </VStack>
    </Box>

    )
}


export default PublicScreen
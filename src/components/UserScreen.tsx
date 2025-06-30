import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  Heading,
} from "@chakra-ui/react";

function UserScreen() {

    return(
         <Box minH="100vh" bg="#234E52" p={8} color="white">
      {/* Container central */}
      <Box
        bg="white"
        color="#234E52"
        maxW="60rem"
        mx="auto"
        marginTop="8rem"
        p={8}
        rounded="md"
        boxShadow="lg"
      >
        <Heading size="lg" mb={6}>
          Buscar Usuários
        </Heading>

        {/* Campos de busca */}
        <Flex
          direction={["column", "row"]}
          gap={4}
          mb={8}
        >
          <FormControl>
            <FormLabel>Buscar por nome</FormLabel>
            <Input
              placeholder="Digite o nome do usuário"
              focusBorderColor="#38B2AC"
              bg="white"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Buscar por ID</FormLabel>
            <Input
              placeholder="Digite o ID do usuário"
              focusBorderColor="#38B2AC"
              bg="white"
            />
          </FormControl>
        </Flex>

        {/* Lista de usuários */}
       <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <Box
              key={id}
              bg="#E6FFFA"
              p={4}
              rounded="md"
              boxShadow="md"
              transition="0.2s"
              _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
            >
              <Text fontWeight="bold">Nome Sobrenome {id}</Text>
              <Text>Email: usuario{id}@site.com</Text>
              <Text>ID: {id * 100}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
    )
}

export default UserScreen
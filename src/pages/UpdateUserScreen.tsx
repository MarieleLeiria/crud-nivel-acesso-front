import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import api from "../api/api";
import { useParams } from "react-router";
import { getUserInfo } from "../utils/getUserInfo";

function UpdateUserScreen() {
  const [objectUser, setObjectUser] = useState({
    firstName: "",
    lastName: "",
    access: "",
  });

  const toast = useToast();
  const { id } = useParams();

  async function fetchUserData() {
    try {
      if (!id) return;

      const userInfo = await getUserInfo(id);
      setObjectUser(userInfo);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [id]);

  //   useEffect(() => {
  //   async function fetchUser() {
  //     const response = await api.get(`auth/${id}`);
  //     const data = response.data;
  //     setObjectUser({
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       access: data.access.toLowerCase(), // 👈 isso garante que vem minúsculo
  //     });
  //   }
  //   fetchUser();
  // }, []);

  async function updateUser() {
    const token = localStorage.getItem("token");
    if (!objectUser.firstName || !objectUser.lastName || !objectUser.access)
      return;

    try {
      const response = await api.patch(`auth/${id}`, objectUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Usuário atualizado com sucesso!",
        description: `Título: ${response.statusText}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        description: `Título: ${
          error && typeof error === "object" && "message" in error
            ? (error as any).message
            : String(error)
        }`,
        title: "Erro ao atualizar usuário.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box minH="100vh" bg="#234E52" p={8} color="white">
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUser();
          }}
        >
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              placeholder="Digite seu nome"
              focusBorderColor="#38B2AC"
              type="text"
              value={objectUser.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setObjectUser({ ...objectUser, firstName: e.target.value });
              }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Sobrenome</FormLabel>
            <Input
              placeholder="Digite seu sobrenome"
              focusBorderColor="#38B2AC"
              type="text"
              value={objectUser.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setObjectUser({ ...objectUser, lastName: e.target.value });
              }}
            />
          </FormControl>

          <FormControl isRequired>
            <Select
              value={objectUser.access}
              onChange={(e) => {
                setObjectUser({ ...objectUser, access: e.target.value });
              }}
            >
              <option value="">Selecione o tipo de acesso</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full" mt={6}>
            Atualizar
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default UpdateUserScreen;

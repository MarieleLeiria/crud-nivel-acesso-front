import { Box, Flex, HStack, Button, Text, Spacer } from "@chakra-ui/react";
import { jwtDecode } from 'jwt-decode';

interface NavbarProps {
  onLogout: () => void;
  onSearch: () => void;
  onRegister: () => void;
  navigateBack: () => void;
}

function Navbar({ onLogout, onSearch, onRegister, navigateBack }: NavbarProps) {
  const storedToken = localStorage.getItem('access_token');
  const payload = storedToken ? jwtDecode<{ access?: string }>(storedToken) : null;
  const isAdmin = payload?.access === 'admin';

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bg="teal.500"
      color="white"
      px={6}
      py={3}
      boxShadow="md"
      zIndex={1000}
    >
      <Flex alignItems="center">
        <Text fontSize="xl" fontWeight="bold">
          Meu app
        </Text>

        <Spacer />

        <HStack>
          {isAdmin && (
            <Button variant="ghost" onClick={onRegister} _hover={{ bg: "teal.600" }}>
              Cadastrar
            </Button>
          )}
          <Button variant="ghost" onClick={onSearch} _hover={{ bg: "teal.600" }}>
            Buscar
          </Button>
          <Button variant="ghost" onClick={navigateBack} _hover={{ bg: "teal.600" }}>
            Voltar
          </Button>
          <Button variant="ghost" onClick={onLogout} _hover={{ bg: "teal.600" }}>
            Sair
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;

import { Box, Heading, Text, VStack } from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Box
        height="100vh"
        width="100vw"
        bgGradient="linear(to-r, pink.100, purple.100)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        overflow="hidden"
      >
        <VStack spacing={6}>
          <Heading fontSize="4xl" color="pink.500">
            ✨ Bem-vinda ao Sisteminha da Mari 💖
          </Heading>

          <Text fontSize="lg" color="purple.700">
            👸💅
          </Text>

          <Text fontSize="sm" color="gray.600">
            Feito com odio e glitter 💫
          </Text>
        </VStack>
      </Box>
    </>
  );
}

export default Home;

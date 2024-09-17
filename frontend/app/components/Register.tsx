"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register({
  toggleScreen,
}: {
  toggleScreen: () => void;
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5001/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        }
      );
      const data = await response.json();
      if (data.error) {
        console.log(data);
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: "Success",
        description: `Welcome back ${data.email}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data.token));
      toggleScreen();
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Flex align={"center"} justify={"center"} h={"100vh"}>
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        className="w-full"
        align={"center"}
        justify={"center"}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create an account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          boxShadow={"lg"}
          p={20}
          className="w-1/2"
          bg={"white"}
        >
          <Stack
            spacing={4}
            className="w-full"
            align={"center"}
            justify={"center"}
          >
            <FormControl
              id="email"
              className="w-full flex flex-col justify-center items-center"
            >
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                value={inputs.email}
                className="border-2 w-1/2 h-10 rounded-2xl "
              />
            </FormControl>
            <Box my={10} />
            <FormControl
              isRequired
              className="w-full flex flex-col justify-center items-center"
            >
              <FormLabel>Password</FormLabel>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                value={inputs.password}
                className="border-2 w-1/2 h-10 rounded-2xl "
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                loadingText="Logging in"
                size="lg"
                bg={"black"}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                px={20}
                py={10}
                mt={10}
                onClick={() => handleLogin()}
                isLoading={isLoading}
              >
                Sign Up
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6} onClick={toggleScreen}>
            <Text align={"center"}>
              Have an account?
              <Link
                color={"blue.400"}
                cursor={"pointer"}
                onClick={() => {
                  toggleScreen();
                }}
              >
                Sign In
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

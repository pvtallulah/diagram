"use client";

import { theme } from "@/templates/theme";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  ChakraProvider,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { generateOptions, verifyOptions } from "./serverActions";

async function authorize(email: string): Promise<boolean> {
  const options = await generateOptions(email);
  const authorization =
    "pubKeyCredParams" in options
      ? await startRegistration(options)
      : await startAuthentication(options);

  const { verification } = await verifyOptions(email, authorization);
  return verification.verified;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [errorText, setErrorText] = useState<string | null>(null);
  const router = useRouter();

  async function authorizationFlow() {
    setIsLoading(true);

    try {
      if (!email) {
        throw new Error("Email is required");
      }
      if (!isValidEmail(email)) {
        throw new Error("Email is not valid");
      }

      const isVerified = await authorize(email);
      if (!isVerified) {
        throw new Error("Key could not verified by the server");
      }

      router.push("/");
    } catch (e) {
      setErrorText((e as Error).message);
    }

    setIsLoading(false);
  }

  return (
    <ChakraProvider theme={theme}>
      <Center width="100%" height="100vh">
        <Card margin="16">
          <CardHeader>
            <Heading>Login or Register</Heading>
          </CardHeader>

          <CardBody display="grid" gridTemplateColumns="auto 1fr" gap="8">
            {errorText && (
              <Alert status="error" gridColumn="1 / -1">
                <AlertIcon />
                <AlertTitle>There was an error</AlertTitle>
                <AlertDescription>{errorText}</AlertDescription>
              </Alert>
            )}

            <FormLabel htmlFor="email" textAlign="right" lineHeight="40px">
              Email
            </FormLabel>

            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              isInvalid={!!email && isValidEmail(email) === false}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardBody>

          <CardFooter display="flex" gap="8">
            <Button
              colorScheme="blue"
              onClick={authorizationFlow}
              disabled={isLoading}
            >
              Authorize Me
            </Button>
          </CardFooter>
        </Card>
      </Center>
    </ChakraProvider>
  );
}

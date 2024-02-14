import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Box, Input, useToast, ScaleFade, Image, Text } from "@chakra-ui/react";

import LoadingComponent from "./LoadingComponent";
import QrCodeComponent from "./QrCodeComponent";

interface TextInputComponentProps {
  // Define any props here if needed
}

const TextInputComponent: React.FC<TextInputComponentProps> = () => {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    // Regular expression to check if the first 10 characters of input are uppercase letters or numbers
    const pattern = /^[A-Z0-9]{9}/;

    if (!pattern.test(input)) {
      toast({
        title:
          "Invalid input. Please scan the bar code on the meal exchange website.",
        status: "error",
        duration: 2000,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/submit-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      // For testing purposes, this is always true
      const isResponseOk = true;

      if (isResponseOk) {
      } else {
        toast({
          title: "Failed to submit. Try again later.",
          status: "error",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "Network error. Please try again.",
        status: "warning",
        duration: 2000,
      });
    } finally {
      setTimeout(() => {
        toast({
          title: "Success! Enjoy your meal.",
          status: "success",
          duration: 5000,
        });
        setInput("");
        setLoading(false);
      }, 2000);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingTop="50px"
        paddingBottom="50px"
      >
        <Text fontSize="4xl">Welcome to Ivy Meal Exchange.</Text>
      </Box>
      <ScaleFade initialScale={0.9} in={loading}>
        <LoadingComponent />
      </ScaleFade>
      <ScaleFade initialScale={0.9} in={!loading}>
        <form onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            placeholder="Scan your bar code"
            value={input}
            onChange={handleInputChange}
            disabled={loading}
            autoFocus
          />
        </form>
      </ScaleFade>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxW="200px"
        paddingTop="40px"
      >
        <QrCodeComponent />
        <Text
          fontSize="sm"
          fontStyle="italic"
          color="black"
          backgroundColor="white"
          padding="2px"
          marginTop="-2px"
        >
          www.princeton.edu/mealx
        </Text>
      </Box>
    </Box>
  );
};

export default TextInputComponent;

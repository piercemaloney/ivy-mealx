import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import TextInputComponent from "./components/TextInputComponent";

export const App = () => {
  return (
    <ChakraProvider>
      <div className="App">
        <TextInputComponent />
      </div>
    </ChakraProvider>
  );
};

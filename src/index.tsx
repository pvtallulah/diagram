import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import { TodoListContextProvider } from "./context/TodoListContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

root.render(
  <ChakraProvider theme={theme}>
    <TodoListContextProvider>
      <App />
    </TodoListContextProvider>
  </ChakraProvider>
);

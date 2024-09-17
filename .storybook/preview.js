import { extendTheme } from '@chakra-ui/react'
import colors from "../src/styles/colors";
const theme = extendTheme({
  colors,
  });

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme,
  },
};

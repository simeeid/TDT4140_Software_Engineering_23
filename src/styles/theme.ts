import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import colors from "./colors";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#F8F9FA",
        _dark: {
          bg: "gray.bg2",
        },
        fontFamily: "Poppins, sans-serif",
      },
      p: {
        color: "gray.900",
        _dark: {
          color: "gray.50",
        }
      }
    },
  },
  colors,
  config,
  semanticTokens: {
    colors: {
      error: 'red.500',
      hovComp: { 
        default: 'white',
            _dark: 'gray.bg1',
      },
      defaultHeader: {
        default: 'rgba(255, 255, 255, 0.7)',
        _dark: 'linear-gradient(112.83deg, rgba(23, 25, 35, 0.82) 0%, rgba(142, 142, 142, 0.8) 120%)',
      },
      sideBar: {
        default: '#F8F9FA',
        _dark: 'gray.bg2',
      },
      sideBarActive: {
        default: 'white', 
        _dark: '#4FD1C5',
      },
      sideBarIcon: {
        default: 'white',
        _dark: 'gray.bg1',
      },
      sideBarInverse: {
        default: 'white',
        _dark: 'gray.bg1',
      },
      sideBarDarkDiv: {
        default: 'gray.bg1',
        _dark: 'gray.bg1',
      },
      textColor: {
        default: 'black',
        _dark: 'white',
      },
      invertTextColor: {
        default: 'white',
        _dark: 'black',
      },
      sideBarBorderBottom : {
        default: 'linear-gradient(0.25turn,#F8F9FA ,rgba(23, 25, 35, 0.82), #F8F9FA)',
        _dark: 'linear-gradient(0.25turn, rgba(23, 25, 35, 0.82), #F8F9FA, rgba(23, 25, 35, 0.82))',
      }
  }
}
});

export default theme;

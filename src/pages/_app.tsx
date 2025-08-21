import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider, createGlobalStyle, DefaultTheme } from 'styled-components';
import { AutenticacaoProvider } from '@/data/contexts/AutenticacaoContext';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider as MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import muiTheme from '@/theme';
import type { AppProps } from 'next/app';
import 'leaflet/dist/leaflet.css';


import MenuTopBeto from '@/components/home/home';

import '@/styles/globals.css';

// Dynamic imports
const ChatBot = dynamic(() => import('../components/chat/ChatBot'), {
  ssr: false,
  loading: () => null
});

const Particles = dynamic(() => import('@/components/landing/particles'), {
  ssr: false,
  loading: () => null
});

// Temas
const lightTheme: DefaultTheme = {
  backgroundColor: '#f4f6fa',
  textColor: '#222',
};

const darkTheme: DefaultTheme = {
  backgroundColor: '#15161a',
  textColor: '#fafafa',
};

// Estilo global corrigido
const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    background-color: ${(props: any) => props.theme.backgroundColor};
    color: ${(props: any) => props.theme.textColor};
    font-family: 'Montserrat', 'Poppins', 'Segoe UI', 'Roboto', Arial, sans-serif;
    transition: background-color 0.3s, color 0.3s;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
  }

  #__next {
    min-height: 100vh;
    width: 100%;
  }

  img, video, iframe, embed, object {
    max-width: 100% !important;
    height: auto !important;
  }
`;

// Estilos com makeStyles
const useStyles = makeStyles(() => ({
  mainWrapper: {
    minHeight: '100vh',
    paddingBottom: '30px', // espaço para rodapé se necessário
    overflowX: 'hidden',
    backgroundColor: 'inherit',
  },
}));

function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const classes = useStyles();

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <AutenticacaoProvider>

            <MenuTopBeto />

            <div className={classes.mainWrapper}>
              <Component {...pageProps} />
             
            </div>

            <ChatBot />

          </AutenticacaoProvider>
        </MantineProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;

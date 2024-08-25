import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    zIndex: {
      snackbar: number;
      drawer: number;
    };
  }
  interface ThemeOptions {
    zIndex?: {
      snackbar?: number;
      drawer?: number;
    };
  }
}

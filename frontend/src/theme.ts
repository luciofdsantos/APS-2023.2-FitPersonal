import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { ptBR } from '@mui/material/locale';

const defaultTheme = createTheme();

export const colorType = {
  info: '#03a9f4',
  success: '#48bb78',
  error: '#ef5350',
  warning: '#ffa726',
  gray: '#e0e0e0'
};

const theme = (mode: 'light' | 'dark') => {
  return responsiveFontSizes(
    createTheme(
      {
        palette: {
          mode,
          primary: {
            main: '#6842FF',
            light: '#6842FF',
            dark: '#284fb5',
            contrastText: '#fff'
          },
          secondary: {
            main: '#6842FF',
            light: '#A8E6C7',
            dark: '#318f5d',
            contrastText: '#fff'
          },
          background: {
            default: mode === 'light' ? "'#181A20'" : '#181A20',
            paper: mode === 'light' ? grey[50] : '#242526'
          },
          success: {
            main: colorType.success
          },
          warning: {
            main: colorType.warning
          },
          error: {
            main: colorType.error
          },
          info: {
            main: colorType.info
          }
        },
        typography: {
          fontFamily: 'Inter, Arial, sans-serif',
          body1: {
            fontFamily: 'Inter, Arial, sans-serif',
            color: mode === 'light' ? grey[600] : grey[50],
            fontWeight: 500
          },
          body2: {
            fontFamily: 'Inter, Arial, sans-serif',
            fontWeight: 500
          },
          h1: {
            fontFamily: 'Oswald, Arial, sans-serif'
          },
          h2: {
            fontFamily: 'Oswald, Arial, sans-serif'
          },
          h3: {
            fontFamily: 'Oswald, Arial, sans-serif'
          },
          h4: {
            fontFamily: 'Oswald, Arial, sans-serif'
          },
          h5: {
            fontFamily: 'Oswald, Arial, sans-serif'
          },
          h6: {
            fontFamily: 'Oswald, Arial, sans-serif',
            fontWeight: 500
          },
          subtitle2: {
            color: grey[400]
          }
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              html: {
                [defaultTheme.breakpoints.down('md')]: {
                  fontSize: '13px'
                }
              },
              body: {
                fontFamily: 'Inter, Arial, sans-serif'
              }
            }
          },
          MuiLink: {
            styleOverrides: {
              root: (props) => ({
                color: props.theme.palette.primary.main,
                textDecoration: 'none',
                '&:hover': {
                  boxShadow: 'none !important',
                  border: 'none',
                  color: `${props.theme.palette.primary.main} !important`
                }
              })
            }
          },
          MuiButton: {
            variants: [
              {
                props: { color: 'error' },
                style: () => ({
                  backgroundColor: colorType.error,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: colorType.error
                  }
                })
              },
              {
                props: { color: 'success' },
                style: () => ({
                  backgroundColor: colorType.success,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: colorType.success
                  }
                })
              },
              {
                props: { color: 'warning' },
                style: () => ({
                  backgroundColor: colorType.warning,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: colorType.warning
                  }
                })
              },
              {
                props: { color: 'info' },
                style: () => ({
                  backgroundColor: colorType.info,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: colorType.info
                  }
                })
              },
              {
                props: { size: 'large' },
                style: () => ({
                  padding: '16px'
                })
              },
              {
                props: { size: 'small' },
                style: () => ({
                  padding: '6px 18px'
                })
              },
              {
                props: { variant: 'outlined' },
                style: (props) => ({
                  border: 'none !important',
                  boxShadow:
                    props.theme.palette.mode === 'light'
                      ? `${grey[300]} 0 0 0 0.1rem !important`
                      : `${grey[800]} 0 0 0 0.1rem !important`,
                  color:
                    props.theme.palette.mode === 'light' ? grey[700] : grey[50],
                  '&:hover': {
                    boxShadow: 'none',
                    border: 'none',
                    backgroundColor: props.theme.palette.primary.main,
                    color: props.theme.palette.primary.contrastText
                  }
                })
              },
              {
                props: { variant: 'text' },
                style: (props) => ({
                  color: grey[600],
                  '&:hover': {
                    backgroundColor: props.theme.palette.primary.main,
                    color: props.theme.palette.primary.contrastText
                  }
                })
              }
            ],
            styleOverrides: {
              root: (props) => ({
                textTransform: 'none',
                borderRadius: '8px',
                boxShadow: 'none',
                padding: '8px 20px',
                lineHeight: '2',
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: props.theme.palette.primary.main
                }
              })
            }
          },
          MuiCard: {
            styleOverrides: {
              root: () => ({
                backgroundImage: 'none',
                backgroundColor: '#1F2229 !important',
                boxShadow: 'none !important'
              })
            }
          },
          MuiDrawer: {
            styleOverrides: {
              root: () => ({
                backgroundImage: 'none',
                backgroundColor: '#1F2229 !important',
                boxShadow: 'none !important'
              })
            }
          },
          MuiDialog: {
            styleOverrides: {
              paper: () => ({
                backgroundImage: 'none',
                backgroundColor: '#1F2229 !important',
                boxShadow: 'none !important',
                padding: '1.5rem 1rem'
              })
            }
          },
          MuiButtonGroup: {
            variants: [
              {
                props: { variant: 'contained' },
                style: () => ({
                  boxShadow: 'none'
                })
              }
            ],
            styleOverrides: {
              root: () => ({
                padding: '0.25rem',
                borderRadius: '0.5rem',
                backgroundColor: grey[100],
                boxShadow: `${grey[200]} 0 0 0 0.1rem !important`
              })
            }
          },
          MuiDialogActions: {
            styleOverrides: {
              root: {
                padding: 0
              }
            }
          },
          MuiMenuList: {
            styleOverrides: {
              root: {
                marginTop: '0.5rem',
                boxShadow: 'none',
                border: '10px solid #000'
              }
            }
          }
        }
      },
      ptBR
    )
  );
};

export default theme;

import { styled } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';

export const Main = styled(Grid)(() => ({
  position: 'relative'
}));

export const Aside = styled(Grid)(({ theme }) => ({
  position: 'sticky',
  top: '0',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  color: '#fff',
  gap: '1rem',
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0px 4px 7px rgba(103, 103, 103, 0.1)',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

export const StyledContainer = styled(Container)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '5rem',
  padding: '1.5rem'
}));

export const AsideContent = styled('span')(() => ({
  position: 'relative',
  zIndex: 2
}));

export const ContainerInputs = styled(Grid)(() => ({
  flexDirection: 'column',
  gap: '1rem',
  width: '100%'
}));

export const HeaderContainer = styled('span')(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  justifyContent: 'end'
}));

export const Content = styled(Grid)(() => ({
  padding: '1rem'
}));

export const MainContent = styled('div')(() => ({
  width: '100%',
  height: '100%',
  flex: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const ContentContainer = styled('div')(() => ({
  maxWidth: '420px',
  width: '100%',
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column'
}));

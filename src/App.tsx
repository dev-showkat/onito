import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { Container } from '@mui/material';
import { RegistrationForm } from './components/RegistrationForm/index.tsx'
import { UsersList } from './components/UsersList/index.tsx';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Container maxWidth="lg" sx={{ mt: 2, py: 1 }}>
          <RegistrationForm />
          <UsersList />
        </Container>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;

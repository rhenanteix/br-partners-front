import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClientList } from './components/ClientList';
import { CreateClient } from './components/CreateClient';
import { EditClient } from './components/EditClient';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<ClientList />} />
          <Route path="/create" element={<CreateClient />} />
          <Route path="/edit/:id" element={<EditClient />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

import React from 'react';
import { TodoApp } from './components';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div style={{ width: '500px', margin: '0 auto' }}>
          <TodoApp />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;

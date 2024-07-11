import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ApprovalRequests from './pages/ApprovalRequests';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import LeaveRequests from './pages/LeaveRequests';
import NotFound from './pages/NotFound';
import Projects from './pages/Projects';
import ThemeProvider from './providers/ThemeProvider';
import AppLayout from './ui/AppLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='employees' element={<Employees />} />
              <Route path='projects' element={<Projects />} />
              <Route path='leave-requests' element={<LeaveRequests />} />
              <Route path='approval-requests' element={<ApprovalRequests />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          // style: {
          //   fontSize: '16px',
          //   maxWidth: '500px',
          //   padding: '16px 24px',
          //   backgroundColor: 'var(--color-grey-0)',
          //   color: 'var(--color-grey-700)',
          // },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;

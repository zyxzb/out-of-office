import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
    </QueryClientProvider>
  );
};

export default App;

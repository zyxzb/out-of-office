import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ApprovalRequests from './pages/ApprovalRequests';
import NotFound from './pages/NotFound';
import ThemeProvider from './providers/ThemeProvider';
import AppLayout from './ui/AppLayout';
import PageLoader from './ui/PageLoader';
import ProtectedRoute from './ui/ProtectedRoute';
// fake delay and code splitting
import { lazyMinLoadTime } from './utils/LazyMinLoadTime';

const Login = lazyMinLoadTime(() => import('./pages/Login'));
const Dashboard = lazyMinLoadTime(() => import('./pages/Dashboard'));
const Employee = lazyMinLoadTime(() => import('./pages/Employee'));
const Employees = lazyMinLoadTime(() => import('./pages/Employees'));
const LeaveRequests = lazyMinLoadTime(() => import('./pages/LeaveRequests'));
const Projects = lazyMinLoadTime(() => import('./pages/Projects'));
const Users = lazyMinLoadTime(() => import('./pages/Users'));

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
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path='employees' element={<Employees />} />
                <Route path='projects' element={<Projects />} />
                <Route path='leave-requests' element={<LeaveRequests />} />
                <Route
                  path='approval-requests'
                  element={<ApprovalRequests />}
                />
                <Route path='users' element={<Users roles={['admin']} />} />
                <Route path='employee/:employeeId' element={<Employee />} />
              </Route>
              <Route path='login' element={<Login />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
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
        }}
      />
    </QueryClientProvider>
  );
};

export default App;

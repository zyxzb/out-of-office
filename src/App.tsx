import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import ApprovalRequests from './pages/ApprovalRequests';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard';
import Employee from './pages/Employee';
import Employees from './pages/Employees';
import LeaveRequests from './pages/LeaveRequests';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Projects from './pages/Projects';
import Users from './pages/Users';
import ThemeProvider from './providers/ThemeProvider';
import AppLayout from './ui/AppLayout';
import PageLoader from './ui/PageLoader';
import ProtectedRoute from './ui/ProtectedRoute';

// fake delay and code splitting - (code splitting) may be helpful for performance (bigger apps)
// import { lazyMinLoadTime } from './utils/LazyMinLoadTime';

// const Login = lazyMinLoadTime(() => import('./pages/Login'));
// const Dashboard = lazyMinLoadTime(() => import('./pages/Dashboard'));
// const Employee = lazyMinLoadTime(() => import('./pages/Employee'));
// const Employees = lazyMinLoadTime(() => import('./pages/Employees'));
// const LeaveRequests = lazyMinLoadTime(() => import('./pages/LeaveRequests'));
// const Projects = lazyMinLoadTime(() => import('./pages/Projects'));
// const Users = lazyMinLoadTime(() => import('./pages/Users'));
// const Calendar = lazyMinLoadTime(() => import('./pages/Calendar'));

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
                {/* disable route */}
                {/* <Route
                  path='approval-requests'
                  element={<ApprovalRequests />}
                /> */}
                <Route path='users' element={<Users roles={['admin']} />} />
                <Route path='employee/:employeeId' element={<Employee />} />
                <Route path='calendar/' element={<Calendar />} />
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

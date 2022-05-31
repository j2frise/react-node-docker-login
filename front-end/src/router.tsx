import { Suspense, lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PartialRouteObject, RouteProps } from 'react-router';
import SuspenseLoader from 'src/components/SuspenseLoader';
import useAuth from './hooks/useAuth';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const ProtectedRoute = (props: RouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  return <Route {...props} />;
};

const BaseLayout = Loader(lazy(() => import('src/layouts/BaseLayout')));
const Home = Loader(lazy(() => import ('src/pages/Home')));
const Signup = Loader(lazy(() => import('src/pages/Signup')));
const Login = Loader(lazy(() => import('src/pages/Login')));

const routes: PartialRouteObject[] = [
    {
      path: '*',
      element: <BaseLayout />,
      children: [
        {
            path: 'login',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Signup />
        },
        
        {
          element: <ProtectedRoute/>,
          children: [
            {
                path: '/',
                element: <Home />
            },
          ]
        },
        
      ]
    }
  ];
  
  export default routes;
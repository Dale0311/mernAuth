import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Layout from './components/Layout';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App';
import { HomeView } from './views/home';
import { LoginView } from './views/login';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='login' element={<LoginView />} />
      <Route path='' element={<HomeView />} />
    </Route>
  ),
);
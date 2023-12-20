import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from '@/App';
import { HomeView } from '@/views/home';
import { LoginView } from '@/views/login';
import { SettingsView } from '@/views/settings';
import { IssueStatsView } from '@/views/issue-stats';
import { InventoryView } from '@/views/inventory';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<LoginView />} />
      <Route path='/' element={<App />}>
        <Route path='inventory' element={<InventoryView />} />
        <Route path='issue-stats' element={<IssueStatsView />} />
        <Route path='settings' element={<SettingsView />} />
        <Route path='' element={<HomeView />} />
      </Route>
    </>
  ),
);
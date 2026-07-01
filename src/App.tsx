import { HashRouter } from 'react-router-dom';
import AppRouter from './router';
import './i18n'; // Initializes i18next

export default function App() {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
}

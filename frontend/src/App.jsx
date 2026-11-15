import { useAuth } from './presentation/hooks/useAuth.js';
import AuthPage from './presentation/pages/AuthPage.jsx';
import DashboardPage from './presentation/pages/DashboardPage.jsx';
import './presentation/styles/global.css';

export default function App() {
  const auth = useAuth();
  return auth.user
    ? <DashboardPage user={auth.user} onLogout={auth.logout} />
    : <AuthPage onLogin={auth.login} onRegister={auth.register} />;
}

import Layout from './components/Layout.jsx';
import Missing from './components/Missing.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import Home from './components/Home.jsx';
import Admin from './components/Admin.jsx'
import Login from './components/Login.jsx';

import RequireAuth from './components/RequireAuth.jsx';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'Admin': 'admin',
  'Player': 'player',
  'Observer': 'observer',
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="not-allowed" element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Player, ROLES.Observer]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

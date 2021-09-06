import TopBar from '../../../components/TopBar';
import Navigation from '../../../components/Navigation';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

function Header({ headerRoutes, tab, setTab }) {
  const { loginStatus } = useContext(UserContext);
  return (
    <>
      <TopBar appBarRoutes={headerRoutes.appBar} />
      {loginStatus && <Navigation navRoutes={headerRoutes.nav} tab={tab} setTab={setTab} />}
      {!loginStatus && <Navigation navRoutes={headerRoutes.nav} tab={tab} setTab={setTab} />}
    </>
  );
}

export default Header;

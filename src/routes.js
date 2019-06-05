import Home from './views/Home';
import DemoProject from './views/DemoProject';
import BetaSignUp from './views/SignUp';

const Routes = {
  home: {
    url: '/',
    component: Home,
  },
  demoNew: {
    url: '/demo',
    component: DemoProject,
  },
  beta: {
    url: '/beta',
    component: BetaSignUp,
  },
};

export default Routes;

import Home from './views/Home';
import DemoProject from './views/DemoProject';

const Routes = {
  home: {
    url: '/',
    component: Home,
  },
  demoNew: {
    url: '/demo',
    component: DemoProject,
  },
  demo: {
    url: '/demo/:id',
    component: DemoProject,
  },
};

export default Routes;

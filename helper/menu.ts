interface MenuItem {
  title?: string;
  path?: string;
  icon?: string;
  submenu?: MenuItem[];
}

const menu = [
  {
    title: 'Home',
    path: '/home',
    icon: '/home-icon.svg'
  },
  {
    title: 'Analysis',
    path: '#',
    icon: '/analysis-icon.svg',
    submenu: [
      {
        title: 'Strategy',
        path: '/strategy'
      },
      {
        title: 'Top-Down',
        path: '/top-down'
      },
      {
        title: 'Numbers',
        path: 'numbers'
      },
     
    ]
  },
  {
    title: 'Learning',
    path: '#',
    icon: '/learning-icon.svg',
    submenu: [
      {
        title: 'Training',
        path: '/traiding-room'
      },
      {
        title: 'Simulation',
        path: '/simulation'
      }
    ]
  },
  {
    title: 'Meetings',
    path: '#',
    icon: '/meetings-icon.svg',
    submenu: [
      {
        title: 'Company Meetings',
        path: '/company-meeting'
      },
      {
        title: 'Conference Calls',
        path: '/conference-call'
      }
    ]
  },
  {
    title: 'Broker Calls',
    path: '/broker-call',
    icon: '/call-icon.svg'
  },
  {
    title: 'Financial Models',
    path: '/financial-model',
    icon: '/model-icon.svg'
  },
  {
    title: 'Notes',
    path: '/notes',
    icon: '/notes-icon.svg'
  }
];

export default menu;

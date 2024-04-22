const headerNavLinks = {
  home: {
    href: '/',
    title: 'Home',
    multi: false,
    active: false,
    name: 'Home Page',
  },
  default: [
    {
      href: '/',
      title: 'Home',
      multi: false,
      links: [],
      active: true,
      name: 'Home Page',
    },
    {
      title: 'Category',
      links: [
        // {
        //   href: '/meating-events',
        //   title: 'Meating & Events',
        //   multi: false,
        //   active: false,
        // },
        // { href: '/weddings', title: 'Weddings', multi: false, active: false },
        // { href: '/gallary', title: 'Gallary', multi: false, active: false },
      ],
      multi: true,
      active: false,
      name: 'Category',
    },
    // {
    //   title: 'Post Formats',
    //   links: [
    //     {
    //       href: '/Gallery Post',
    //       title: 'Gallery Post',
    //       multi: false,
    //       active: false,
    //     },
    //     {
    //       href: '/Video Post',
    //       title: 'Video Post',
    //       multi: false,
    //       active: false,
    //     },
    //     {
    //       href: '/Travel Guid',
    //       title: 'Travel Guid',
    //       multi: false,
    //       active: false,
    //     },
    //   ],
    //   multi: true,
    //   active: false,
    //   name: 'Post Formats Page',
    // },
    {
      href: '/about-us',
      title: 'About',
      multi: false,
      links: [],
      active: false,
      name: 'About Us',
    },
    {
      href: '/contact',
      title: 'Contact',
      multi: false,
      links: [],
      active: false,
      name: 'Contact Us',
    },
  ],
  settings: [
    {
      href: '/profile',
      title: 'Account',
      active: false,
      auth: false,
      name: 'Acount Setting',
    },
    // {
    //   href: '/prfile',
    //   title: 'Profile',
    //   active: false,
    //   auth: false,
    //   name: 'Prfile Setting',
    // },
    // {
    //   href: '/dashboard',
    //   title: 'Dashboard',
    //   active: false,
    //   auth: false,
    //   name: 'Dashboard Setting',
    // },
    // {
    //   href: '/post',
    //   title: 'Post',
    //   active: false,
    //   auth: false,
    //   name: 'Post Setting',
    // },
    { href: '/', title: 'Logout', active: false, auth: false, name: '' },
  ],
};

export default headerNavLinks;

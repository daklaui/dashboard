import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'account-component',
        title: 'Accounts',
        translate: 'ACCOUNTS',
        type: "collapse",
        icon: "person",
        url: "auth/accounts",
        children: [
          {
            id: "accounts_list",
            title: "Accounts List",
            translate: "ACCOUNTS_LIST",
            type: "item",
            url: "auth/accounts/list",
            end: true,
          },
          {
            id: "account",
            title: "Add Account",
            translate: "ADD_ACCOUNT",
            type: "item",
            url: "auth/accounts/new",
            end: true,
          }
        ]
      },
    ],
  },
];

export default navigationConfig;

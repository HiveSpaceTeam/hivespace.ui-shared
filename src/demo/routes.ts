export const demoRoutes = [
    {
        path: '/demo',
        component: () => import('./DemoLayout.vue'),
        children: [
            {
                path: '',
                name: 'Ecommerce',
                component: () => import('./Ecommerce/Ecommerce.vue'),
                meta: { title: 'eCommerce Dashboard' },
            },
            {
                path: 'components',
                name: 'Components',
                component: () => import('./ComponentsIndex.vue'),
                meta: { title: 'Component Library' },
            },
            {
                path: 'calendar',
                name: 'Calendar',
                component: () => import('./Others/Calendar.vue'),
                meta: { title: 'Calendar' },
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('./Others/UserProfile.vue'),
                meta: { title: 'Profile' },
            },
            {
                path: 'form-elements',
                name: 'Form Elements',
                component: () => import('./Forms/FormElements.vue'),
                meta: { title: 'Form Elements' },
            },
            {
                path: 'quill',
                name: 'Quill',
                component: () => import('./Forms/Quill.vue'),
                meta: { title: 'Quill' },
            },
            {
                path: 'basic-tables',
                name: 'Basic Tables',
                component: () => import('./Tables/BasicTables.vue'),
                meta: { title: 'Basic Tables' },
            },
            {
                path: 'line-chart',
                name: 'Line Chart',
                component: () => import('./Chart/LineChart/LineChart.vue'),
            },
            {
                path: 'bar-chart',
                name: 'Bar Chart',
                component: () => import('./Chart/BarChart/BarChart.vue'),
            },
            {
                path: 'alerts',
                name: 'Alerts',
                component: () => import('./UiElements/Alerts.vue'),
                meta: { title: 'Alerts' },
            },
            {
                path: 'toast',
                name: 'Toast',
                component: () => import('./Toast/ToastDemo.vue'),
                meta: { title: 'Toast Notifications' },
            },
            {
                path: 'modal',
                name: 'Modal',
                component: () => import('./Modal/ModalDemo.vue'),
                meta: { title: 'Modal Popups' },
            },
            {
                path: 'avatars',
                name: 'Avatars',
                component: () => import('./UiElements/Avatars.vue'),
                meta: { title: 'Avatars' },
            },
            {
                path: 'badge',
                name: 'Badge',
                component: () => import('./UiElements/Badges.vue'),
                meta: { title: 'Badge' },
            },
            {
                path: 'buttons',
                name: 'Buttons',
                component: () => import('./UiElements/Buttons.vue'),
                meta: { title: 'Buttons' },
            },
            {
                path: 'images',
                name: 'Images',
                component: () => import('./UiElements/Images.vue'),
                meta: { title: 'Images' },
            },
            {
                path: 'videos',
                name: 'Videos',
                component: () => import('./UiElements/Videos.vue'),
                meta: { title: 'Videos' },
            },
            {
                path: 'blank',
                name: 'Blank',
                component: () => import('./Pages/BlankPage.vue'),
                meta: { title: 'Blank' },
            },
            {
                path: 'signin',
                name: 'Signin',
                component: () => import('./Auth/Signin.vue'),
                meta: { title: 'Signin' },
            },
            {
                path: 'signup',
                name: 'Signup',
                component: () => import('./Auth/Signup.vue'),
                meta: { title: 'Signup' },
            },

        ],
    },
]

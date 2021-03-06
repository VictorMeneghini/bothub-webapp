import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import LandingPage from '@/views/LandingPage';
import SignUp from '@/views/auth/SignUp';
import Terms from '@/views/Terms';
import MyProfile from '@/components/MyProfile';
import ResetPassword from '@/components/ResetPassword';
import RepositoryHome from '@/views/repository/Home';
import RepositoryTrainings from '@/views/repository/Trainings';
import RepositoryTranslate from '@/views/repository/Translate';
import RepositoryTranslations from '@/views/repository/Translations';
import RepositorySettings from '@/views/repository/Settings';
import RepositoryIntegration from '@/views/repository/Integration';
import RepositoryEvaluate from '@/views/repository/Evaluate';
import RepositoryResults from '@/views/repository/Results';
import RepositoryResult from '@/views/repository/Result';
import RepositoryVersions from '@/views/repository/Versions';
import RepositoryLog from '@/views/repository/Log';
import NotFound from '@/views/NotFound';
import SafariAlert from '@/views/SafariAlert';
import DashboardLayout from '@/layout/dashboard/DashboardLayout';
import store from '../store';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage,
      beforeEnter: async (to, from, next) => {
        if (store.getters.authenticated) {
          next('/home');
        } else {
          next();
        }
      },
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms,
    },
    {
      path: '/signup',
      name: 'signUp',
      component: SignUp,
      beforeEnter: async (to, from, next) => {
        if (store.getters.authenticated) {
          next('/home');
        } else {
          next();
        }
      },
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/reset-password/:nickname/:token/',
      component: ResetPassword,
    },
    {
      path: '/myprofile/',
      name: 'myProfile',
      component: MyProfile,
      beforeEnter: async (to, from, next) => {
        if (!store.getters.authenticated) {
          store.dispatch('openLoginModal', {
            next: to,
            redirectToWhenFails: { name: 'home' },
          });
        } else {
          next();
        }
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: ':ownerNickname/:slug/',
          name: 'repository-summary',
          component: RepositoryHome,
        },
        {
          path: ':ownerNickname/:slug/training/',
          name: 'repository-training',
          component: RepositoryTrainings,
        },
        {
          path: ':ownerNickname/:slug/translate/',
          name: 'repository-translate',
          component: RepositoryTranslate,
        },
        {
          path: ':ownerNickname/:slug/translations/',
          name: 'repository-translations-status',
          component: RepositoryTranslations,
        },
        {
          path: ':ownerNickname/:slug/Integration/',
          name: 'repository-integration',
          component: RepositoryIntegration,
        },
        {
          path: ':ownerNickname/:slug/settings/',
          name: 'repository-settings',
          component: RepositorySettings,
        },
        {
          path: ':ownerNickname/:slug/evaluate/',
          name: 'repository-test',
          component: RepositoryEvaluate,
        },
        {
          path: ':ownerNickname/:slug/versions/',
          name: 'repository-versions',
          component: RepositoryVersions,
        },
        {
          path: ':ownerNickname/:slug/log/',
          name: 'repository-log',
          component: RepositoryLog,
        },
        {
          path: ':ownerNickname/:slug/results/',
          name: 'repository-results',
          component: RepositoryResults,
        },
        {
          path: ':ownerNickname/:slug/result/:resultId/:version',
          name: 'repository-result',
          component: RepositoryResult,
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
    {
      path: '/safariAlert/',
      name: 'safari-alert',
      component: SafariAlert,
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

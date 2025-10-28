import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: 'home', loadComponent: () => import('../features/home/home') },
  { path: 'login', loadComponent: () => import('../authentication/login/login') },
  { path: 'register', loadComponent: () => import('../authentication/register/register') },
  { path: 'article/:slug', loadComponent: () => import('../features/article/article') },
  { path: 'profile/:username', loadComponent: () => import('../features/profile/profile') },
  { path: 'settings', loadComponent: () => import('../features/setting/setting') },
  { path: 'editor', loadComponent: () => import('../features/add-edit-article/add-edit-article') },
  { path: '**', redirectTo: '/home' },
];

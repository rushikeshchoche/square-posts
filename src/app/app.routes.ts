import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/posts/posts.component').then(
        (module) => module.PostsComponent
      ),
  },
];

import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/characters/pages/character-list/character-list.component')
        .then(m => m.CharacterListComponent)
  },
  {
    path: 'character/:id',
    loadComponent: () =>
      import('./features/characters/pages/character-detail/character-detail.component')
        .then(m => m.CharacterDetailComponent)
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./features/characters/pages/character-form/character-form.component')
        .then(m => m.CharacterFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./features/characters/pages/character-form/character-form.component')
        .then(m => m.CharacterFormComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

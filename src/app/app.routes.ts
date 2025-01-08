// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';

export const appRoutes: Routes = [
    { path: '', component: TaskListComponent },
    { path: 'tasks', component: TaskListComponent },
  ];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: PostListComponent }, // Página de inicio
  { path: 'create', component: PostCreateComponent }, // Página de creación
  { path: 'edit/:id', component: PostCreateComponent }, // Página de edición
  { path: 'login', component: LoginComponent }, // Página de logeo
  { path: 'signup', component: SignupComponent }, // Página de creación de usuario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

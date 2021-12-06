import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from '../utils/material.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [FormsModule, MaterialModule],
})
export class AuthModule {}

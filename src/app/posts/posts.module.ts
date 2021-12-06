import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { MaterialModule } from '../utils/material.module';

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
})
export class PostsModule {}

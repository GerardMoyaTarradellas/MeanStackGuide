import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /** Define si el componente esta cargando información */
  public is_loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}

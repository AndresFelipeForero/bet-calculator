import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      usuario: [''],
      password: [''],
    });
  }

  ngOnInit() {
    this.error()
  }

  onSubmit() {
    this.router.navigate(['/dashboard'])
  }

  error() {
    this._snackBar.open('Sistema de login no implementado. Click en ingresar', 'Alert', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ingresar() {
    console.log(this.form);
    const usuario = this.form.value.usuario,
      password = this.form.value.password;

    if (usuario === 'andres' && password === '1234' || usuario === 'betters' && password === '1234' || usuario == "Bavngaard"	&& password == "01030709" || usuario == "jhsdiazbo"	&& password == "22291907" || usuario == "jjpolo"	&& password == "Bet4life!" || usuario == "AnaCaroToscano"	&& password == "Ana1994!" || usuario == "Yez0"	&& password == "Better123" || usuario == "LauHerye08"	&& password == "SolJi123" || usuario == "kyga"	&& password == "369741" || usuario == "Lilijarap"	&& password == "Green7729" || usuario == "luzmtsg"	&& password == "980925" || usuario == "DrysArg"	&& password == "290380" || usuario == "Geralvc"	&& password == "derecho0210"
    ) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false
        this.router.navigate(['dashboard']);
      }, 1500);
      console.log(usuario, password);
    } else {
      this.error();
      this.form.reset();
    }
  }

  error() {
    this._snackBar.open('Usuario y/o contraseña invalidos', 'Alert', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    console.log(typeof this._snackBar.open);
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dataMenosEsquinas } from '../../../../assets/data/dataMenosEsquinas';
import { dataMenosGoles } from '../../../../assets/data/dataMenosGoles';


@Component({
  selector: 'app-menos-dos',
  templateUrl: './menos-dos.component.html',
  styleUrls: ['./menos-dos.component.css']
})
export class MenosDosComponent implements OnInit {
  dataMenosEsquinas: any[];
  dataMenosGoles: any[];
  form: FormGroup;
  yF?: string = '0.00';
  yFE?: string ='0.00';
  showTime: string = '0:00';
  span: string = '';
  actionBtn: string = 'Start';
  flag: boolean = false;
  arrayGoles: any[] = [];
  arrayMenosEsquinas: any[] = [];
  goles: number = 2.5;
  esquinas: number = 9.5;
  selected = '0';
  icon: string = 'edit';

  constructor(private fb: FormBuilder) {
    this.dataMenosEsquinas = dataMenosEsquinas;
    this.dataMenosGoles = dataMenosGoles;
    this.form = this.fb.group({
      minutos: [
        75,
        [Validators.required, Validators.min(75), Validators.max(89)],
      ],
      golesEscogidos: ['2.5', Validators.required],
      golesMenosEsquinas: ['9.5', Validators.required],
      extraTime: ['0'],
      segundos: [
        0,
        [Validators.required, Validators.min(0), Validators.max(59)],
      ],
    });
  }

  ngOnInit(): void {
    this.getArrayGoles();
    this.getArrayMenosEsquinas();
  }

  getArrayGoles() {
    let ob = this.dataMenosGoles[0];
    this.arrayGoles = Object.keys(ob).sort();
    this.arrayGoles.pop();
  }

  getArrayMenosEsquinas() {
    let ob = this.dataMenosEsquinas[0];
    delete ob.time
    this.arrayMenosEsquinas = Object.keys(ob).sort((a: any, b: any) => a - b);
  }

  submitForm() {
    if (this.form.valid) {
      this.hallarGol();
    } 
  }

  hallarGol() {
    this.cambiarFlag();

    const x = 60;
    let esquinas = this.form.value.golesMenosEsquinas;
    let goles = this.form.value.golesEscogidos,
      segundos = 60 - this.form.value.segundos,
      minutos =
        89 + parseInt(this.form.value.extraTime) - this.form.value.minutos;
    let y1 = 0,
      y2 = 0,
      b = 0;
    let y2E = 0, //y2 esquinas
      y1E = 0, //y1 esquinas
      bE = 0; //b esquinas

    setInterval(() => {
      if (minutos == 15 && segundos == 0) {
        y2 = this.dataMenosGoles[minutos][goles];
        y1 = this.dataMenosGoles[minutos - 1][goles];
      }
      if (minutos < 15 && minutos >= 1) {
        y2 = this.dataMenosGoles[minutos][goles];
        y1 = this.dataMenosGoles[minutos - 1][goles];
      }

      if (minutos == 10 && segundos == 0) {
        y2E = this.dataMenosEsquinas[minutos][esquinas]; //y2 esquinas
        y1E = this.dataMenosEsquinas[minutos - 1][esquinas]; //y1 esquinas
      }

      if (minutos < 10 && minutos >= 1) {
        y2E = this.dataMenosEsquinas[minutos][esquinas]; //y2 esquinas
        y1E = this.dataMenosEsquinas[minutos - 1][esquinas]; //y1 esquinas
      }

      if (minutos < 1) {
        y2 = this.dataMenosGoles[minutos][goles];
        y2E = this.dataMenosEsquinas[minutos][esquinas]; //y2 esquinas
        y1E = 1;
        y1 = 1;
      }

      let m = (y2 - y1) / x;
      b = y2 - m * x;

      let mE = (y2E - y1E) / x;
      bE = y2E - mE * x;

      if (segundos >= 0 && minutos >= 0) {
        if (this.flag == false) {
          segundos = 0;
          minutos = 0;
        }
        if (segundos == 0 && minutos == 0) {
          return;
        }
        this.yF = (m * segundos + b).toFixed(2);
        this.yFE = (mE * segundos + bE).toFixed(2);
        segundos = segundos - 1;
        this.showTime = `${minutos} : ${segundos}`;

        if (segundos == 0) {
          if (segundos == 0 && minutos == 0) {
            return;
          }

          minutos = minutos - 1;
          segundos = 60;
        }
      }
    }, 1000);
  }

  cambiarFlag() {
    this.flag = !this.flag;
    this.actionBtn = !this.flag ? 'Start' : 'Stop' 
  }
}

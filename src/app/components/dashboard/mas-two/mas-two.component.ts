import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dataMasEsquinas } from 'src/assets/data/dataMasEsquinas';
import { DataMasGoles } from 'src/assets/data/dataMasGoles';


@Component({
  selector: 'app-mas-two',
  templateUrl: './mas-two.component.html',
  styleUrls: ['./mas-two.component.css']
})
export class MasTwoComponent implements OnInit {
  form: FormGroup;
  yF?: string = '0.00';
  yFE?: string = '0.00';
  showTime: string = '0:00';
  span: string = '';
  actionBtn: string = 'Start';
  flag: boolean = false;
  arrayGoles: any[] = [];
  arrayMasEsquinas: any[] = [];
  goles: number = 2.5;
  esquinas: number = 9.5;
  selected = '0';
  icon: string = 'edit';
  dataMasEsquinas;
  dataMasGoles;

  constructor(private fb: FormBuilder) {
    this.dataMasGoles = DataMasGoles
    
    this.dataMasEsquinas = dataMasEsquinas

    this.form = this.fb.group({
      minutos: [
        70,
        [Validators.required, Validators.min(70), Validators.max(85)],
      ],
      golesEscogidos: ['1.5', Validators.required],
      golesMenosEsquinas: ['7', Validators.required],
      extraTime: ['0'],
      segundos: [
        0,
        [Validators.required, Validators.min(0), Validators.max(59)],
      ],
    });
  }

  ngOnInit(): void {
    this.getArrayGoles();
    this.getArrayMasEsquinas();
  }

  getArrayGoles() {
    let ob = this.dataMasGoles[0];
    delete ob.time
    this.arrayGoles = Object.keys(ob).sort((a: any, b: any) => b - a);
  }
  getArrayMasEsquinas() {
    let ob = this.dataMasEsquinas[0];
    delete ob.time
    this.arrayMasEsquinas = Object.keys(ob).sort((a: any, b: any) => b - a);
    
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
      if (minutos == 20 && segundos == 0) {
        y2 = this.dataMasGoles[minutos][goles];
        y1 = this.dataMasGoles[minutos - 1][goles];
        y2E = this.dataMasEsquinas[minutos][esquinas]; //y2 esquinas
        y1E = this.dataMasEsquinas[minutos - 1][esquinas]; //y1 esquinas
      }
      if (minutos < 20 && minutos >= 4) {
        y2 = this.dataMasGoles[minutos][goles];
        y1 = this.dataMasGoles[minutos - 1][goles];
        y2E = this.dataMasEsquinas[minutos][esquinas]; //y2 esquinas
        y1E = this.dataMasEsquinas[minutos - 1][esquinas]; //y1 esquinas
      }

      if (minutos < 5) {
        y2 = this.dataMasGoles[minutos][goles];
        y2E = this.dataMasEsquinas[minutos][esquinas]; //y2 esquinas
        y1E = this.dataMasEsquinas[3][esquinas];
        y1 = this.dataMasGoles[3][goles];
      }

      let m = (y2 - y1) / x;
      b = y2 - m * x;

      let mE = (y2E - y1E) / x;
      bE = y2E - mE * x;

      if (segundos >= 0 && minutos >= 4) {
        if (this.flag == false) {
          segundos = 0;
          minutos = 4;
        }
        if (segundos == 0 && minutos == 4) {
          return;
        }

        this.yF = (m * segundos + b).toFixed(2);
        this.yFE = (mE * segundos + bE).toFixed(2);
        segundos = segundos - 1;
        this.showTime = `${minutos} : ${segundos}`;

        if (segundos == 0) {
          if (segundos == 0 && minutos == 4) {
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

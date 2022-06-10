import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-menos-tres',
  templateUrl: './menos-tres.component.html',
  styleUrls: ['./menos-tres.component.css']
})
export class MenosTresComponent implements OnInit {

  form: FormGroup;
  yF?: string;
  yFE?: string;
  showTime: string = "";
  span: string = "";
  actionBtn: string = "Start";
  flag: boolean = false;
  arrayGoles: any[]=[];
  arrayMenosEsquinas: any[]=[];
  goles: number = 2.5;
  esquinas: number = 9.5;
  selected = '0';
  
  

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      minutos: [75, [Validators.required, Validators.min(75), Validators.max(89)]],
      golesEscogidos: ["2.5", Validators.required],
      golesMenosEsquinas: ["9.5", Validators.required],
      extraTime: ["0"],
      segundos: [0, [Validators.required, Validators.min(0), Validators.max(59)]]
    }) 
  }

  ngOnInit(): void { 
    // let pbr = parseFloat(this.form.value.golesMenosEsquinas)    
    
  //  this.arrayMenosEsquinas[0][pbr]
   this.getArrayGoles() 
   this.getArrayMenosEsquinas() 
  
  }

  getArrayGoles(){
   let ob = this.datosDirectos[0];
   this.arrayGoles = (Object.keys(ob).sort())
   this.arrayGoles.pop()
   console.log(this.arrayGoles)
  }
  getArrayMenosEsquinas(){
   let ob = this.dataMenosEsquinas[0];
   this.arrayMenosEsquinas = (Object.keys(ob).sort())
   this.arrayMenosEsquinas.pop()
   let last = this.arrayMenosEsquinas.pop()
   this.arrayMenosEsquinas.unshift(last)
   console.log(this.arrayMenosEsquinas)   
  }

  submitForm(){
    // if (this.form.invalid && this.actionBtn == "Stop") {
      
    //   this.actionBtn="Start"
    //   this.hallarGol()
    // } 
    if (this.form.invalid) {return} 
    else {this.hallarGol()}

    console.log(this.form.invalid)
    console.log(this.form.controls["minutos"].errors)
  }
  
  hallarGol(){
    this.cambiarFlag()   
    console.log(this.form.value.extraTime) 
    const x = 60;
    let esquinas = this.form.value.golesMenosEsquinas;    
    let goles = this.form.value.golesEscogidos,
        segundos = 60 - this.form.value.segundos,
        minutos = 89 + parseInt(this.form.value.extraTime) - this.form.value.minutos;       
    let y1 = 0,
        y2 = 0,
        b = 0;
    let y2E = 0, //y2 esquinas
        y1E = 0, //y2 esquinas
        bE = 0; //y2 esquinas

        // if (minutos < 0){this.span = "Partido finalizado.  si está en tiempo extra, ingrese el valor 89 y agregue los minutos adicionales con el botón '1+'"
        // setTimeout(() => {
        //   this.span = ""          
        // }, 6000);
        // return
        // }

        // if (minutos >= 15) { 
        //   minutos = 14;
        //   segundos = 60  
        // }   

        if (this.flag == true) {
          this.actionBtn = 'Stop';
        }
        if (this.flag == false) {
          this.actionBtn = 'Start';
        }
        
          setInterval(()=>{
            if (minutos == 15 && segundos == 0) {
              y2 = this.datosDirectos[minutos][goles];
              y1 = this.datosDirectos[minutos-1][goles];
            }
            if (minutos < 15 && minutos >= 1) {
              y2 = this.datosDirectos[minutos][goles];
              y1 = this.datosDirectos[minutos-1][goles];
            }

            if (minutos == 10 && segundos == 0) {
              
              y2E = this.dataMenosEsquinas[minutos][esquinas]; //y2 esquinas
              y1E = this.dataMenosEsquinas[minutos-1][esquinas]; //y2 esquinas
            }
            if (minutos < 10 && minutos >= 1) {
              
              y2E = this.dataMenosEsquinas[minutos][esquinas]; //y2 esquinas
              y1E = this.dataMenosEsquinas[minutos-1][esquinas]; //y2 esquinas
            }
            
                        
            // lo que sirve
            //  y2 = this.datosDirectos[minutos][goles];
            
            if (minutos < 1) {
              y2E = this.dataMenosEsquinas[minutos][esquinas]; //y2 esquinas
              y1E = 1;
              y1 = 1;
            }
            //  else {
            //   y1 = this.datosDirectos[minutos-1][goles];
            // }
            // console.log(y2E)
            // console.log(y1E)
            let m = (y2 - y1)/x;
            b = y2 - m * x;
                
            let mE = (y2E - y1E)/x;
            bE = y2E - mE * x;
        
            if (segundos >= 0 && minutos >=0) {
              if (this.flag == false) {
                segundos = 0;
                minutos= 0;                
              }
              if ( segundos == 0 && minutos == 0) {return}
              this.yF = (m * segundos + b).toFixed(2);
              this.yFE = (mE * segundos + bE).toFixed(2);
              segundos = segundos - 1;            
              this.showTime = `${minutos} : ${segundos}`;
              console.log(minutos , segundos);
              // console.log(this.yF)
              
              
              if (segundos == 0) { 
                if ( segundos == 0 && minutos == 0) {return} 
                         
                minutos = minutos -1
                segundos = 60
              }
              
            }
          },1000)               
              
  }


  cambiarFlag(){
    this.flag=!this.flag    
  }

  dataMenosEsquinas: any[]= [
    {
      10: 1.13,
      11: 1.14,
      12: 1.16,
      13: 1.17,
      14: 1.19,
      15: 1.2,
      16: 1.22,
      17: 1.24,
      time: 1,
      9.5: 1.12,
      10.5: 1.13,
      11.5: 1.15,
      12.5: 1.16,
      13.5: 1.18,
      14.5: 1.19,
      15.5: 1.21,
      16.5: 1.23
    },
    {
      10: 1.27,
      11: 1.3,
      12: 1.33,
      13: 1.36,
      14: 1.4,
      15: 1.44,
      16: 1.48,
      17: 1.52,
      time: 2,
      9.5: 1.26,
      10.5: 1.29,
      11.5: 1.32,
      12.5: 1.35,
      13.5: 1.38,
      14.5: 1.42,
      15.5: 1.46,
      16.5: 1.5
    },
    {
      10: 1.42,
      11: 1.47,
      12: 1.53,
      13: 1.59,
      14: 1.66,
      15: 1.72,
      16: 1.77,
      17: 1.85,
      time: 3,
      9.5: 1.39,
      10.5: 1.45,
      11.5: 1.5,
      12.5: 1.56,
      13.5: 1.62,
      14.5: 1.69,
      15.5: 1.74,
      16.5: 1.81
    },
    {
      10: 1.6,
      11: 1.68,
      12: 1.74,
      13: 1.83,
      14: 1.93,
      15: 2.04,
      16: 2.15,
      17: 2.27,
      time: 4,
      9.5: 1.56,
      10.5: 1.64,
      11.5: 1.72,
      12.5: 1.79,
      13.5: 1.88,
      14.5: 1.98,
      15.5: 2.09,
      16.5: 2.21
    },
    {
      10: 1.77,
      11: 1.88,
      12: 2,
      13: 2.13,
      14: 2.24,
      15: 2.39,
      16: 2.56,
      17: 2.73,
      time: 5,
      9.5: 1.71,
      10.5: 1.82,
      11.5: 1.94,
      12.5: 2.07,
      13.5: 2.21,
      14.5: 2.32,
      15.5: 2.47,
      16.5: 2.64
    },
    {
      10: 1.98,
      11: 2.14,
      12: 2.28,
      13: 2.46,
      14: 2.66,
      15: 2.88,
      16: 3.07,
      17: 3.33,
      time: 6,
      9.5: 1.91,
      10.5: 2.06,
      11.5: 2.22,
      12.5: 2.37,
      13.5: 2.56,
      14.5: 2.77,
      15.5: 2.96,
      16.5: 3.2
    },
    {
      10: 2.2,
      11: 2.4,
      12: 2.62,
      13: 2.86,
      14: 3.09,
      15: 3.38,
      16: 3.71,
      17: 4.01,
      time: 7,
      9.5: 2.14,
      10.5: 2.29,
      11.5: 2.51,
      12.5: 2.74,
      13.5: 2.95,
      14.5: 3.23,
      15.5: 3.54,
      16.5: 3.83
    },
    {
      10: 2.46,
      11: 2.72,
      12: 2.96,
      13: 3.27,
      14: 3.63,
      15: 3.95,
      16: 4.4,
      17: 4.89,
      time: 8,
      9.5: 2.34,
      10.5: 2.59,
      11.5: 2.81,
      12.5: 3.11,
      13.5: 3.45,
      14.5: 3.75,
      15.5: 4.17,
      16.5: 4.64
    },
    {
      10: 2.76,
      11: 3.02,
      12: 3.39,
      13: 3.72,
      14: 4.17,
      15: 4.7,
      16: 5.17,
      17: 5.83,
      time: 9,
      9.5: 2.61,
      10.5: 2.86,
      11.5: 3.2,
      12.5: 3.59,
      13.5: 3.94,
      14.5: 4.43,
      15.5: 4.87,
      16.5: 5.49
    },
    {
      10: 3.06,
      11: 3.47,
      12: 3.86,
      13: 4.38,
      14: 4.89,
      15: 5.58,
      16: 6.24,
      17: 7.13,
      time: 10,
      9.5: 2.88,
      10.5: 3.26,
      11.5: 3.62,
      12.5: 4.11,
      13.5: 4.68,
      14.5: 5.22,
      15.5: 5.96,
      16.5: 6.67
    }
  ]

  datosDirectos: any[] = [
    {
      time: 1,
      2.5: 1.03,   
      3: 1.04,      
      3.5: 1.04,  
      4: 1.05,     
      4.5: 1.05,
      5: 1.06,      
      5.5: 1.07,
      6: 1.07,
      6.5: 1.08,
      7: 1.09,
      7.5: 1.09,
      8: 1.1,
      8.5: 1.11
    },
    {
      time: 2,
      2.5: 1.06,
      3: 1.07,
      3.5: 1.09,
      4: 1.1,
      4.5: 1.11,
      5: 1.12,
      5.5: 1.14,
      6: 1.15,
      6.5: 1.17,
      7: 1.18,
      7.5: 1.19,
      8: 1.21,
      8.5: 1.22
    },
    {
      time: 3,
      2.5: 1.09,
      3: 1.11,
      3.5: 1.13,
      4: 1.15,
      4.5: 1.17,
      5: 1.19,
      5.5: 1.21,
      6: 1.24,
      6.5: 1.26,
      7: 1.28,
      7.5: 1.3,
      8: 1.33,
      8.5: 1.35
    },
    {
      time: 4,
      2.5: 1.13,
      3: 1.15,
      3.5: 1.18,
      4: 1.21,
      4.5: 1.24,
      5: 1.27,
      5.5: 1.3,
      6: 1.33,
      6.5: 1.36,
      7: 1.39,
      7.5: 1.43,
      8: 1.46,
      8.5: 1.5
    },
    {
      time: 5,
      2.5: 1.16,
      3: 1.19,
      3.5: 1.23,
      4: 1.27,
      4.5: 1.3,
      5: 1.34,
      5.5: 1.38,
      6: 1.42,
      6.5: 1.47,
      7: 1.51,
      7.5: 1.56,
      8: 1.61,
      8.5: 1.66
    },
    {
      time: 6,
      2.5: 1.2,
      3: 1.24,
      3.5: 1.28,
      4: 1.33,
      4.5: 1.38,
      5: 1.42,
      5.5: 1.48,
      6: 1.53,
      6.5: 1.58,
      7: 1.64,
      7.5: 1.7,
      8: 1.77,
      8.5: 1.83
    },
    {
      time: 7,
      2.5: 1.23,
      3: 1.28,
      3.5: 1.34,
      4: 1.39,
      4.5: 1.45,
      5: 1.51,
      5.5: 1.57,
      6: 1.64,
      6.5: 1.71,
      7: 1.78,
      7.5: 1.86,
      8: 1.94,
      8.5: 2.03
    },
    {
      time: 8,
      2.5: 1.27,
      3: 1.33,
      3.5: 1.39,
      4: 1.46,
      4.5: 1.53,
      5: 1.6,
      5.5: 1.68,
      6: 1.76,
      6.5: 1.85,
      7: 1.94,
      7.5: 2.03,
      8: 2.13,
      8.5: 2.24
    },
    {
      time: 9,
      2.5: 1.31,
      3: 1.38,
      3.5: 1.45,
      4: 1.53,
      4.5: 1.61,
      5: 1.7,
      5.5: 1.79,
      6: 1.89,
      6.5: 1.99,
      7: 2.1,
      7.5: 2.22,
      8: 2.35,
      8.5: 2.48
    },
    {
      time: 10,
      2.5: 1.35,
      3: 1.43,
      3.5: 1.51,
      4: 1.6,
      4.5: 1.7,
      5: 1.8,
      5.5: 1.91,
      6: 2.03,
      6.5: 2.15,
      7: 2.28,
      7.5: 2.43,
      8: 2.58,
      8.5: 2.74
    },
    {
      time: 11,
      2.5: 1.39,
      3: 1.48,
      3.5: 1.58,
      4: 1.68,
      4.5: 1.79,
      5: 1.91,
      5.5: 2.04,
      6: 2.18,
      6.5: 2.32,
      7: 2.48,
      7.5: 2.65,
      8: 2.83,
      8.5: 3.03
    },
    {
      time: 12,
      2.5: 1.43,
      3: 1.53,
      3.5: 1.65,
      4: 1.76,
      4.5: 1.89,
      5: 2.03,
      5.5: 2.18,
      6: 2.34,
      6.5: 2.51,
      7: 2.7,
      7.5: 2.9,
      8: 3.12,
      8.5: 3.36
    },
    {
      time: 13,
      2.5: 1.48,
      3: 1.59,
      3.5: 1.72,
      4: 1.85,
      4.5: 1.99,
      5: 2.15,
      5.5: 2.32,
      6: 2.51,
      6.5: 2.71,
      7: 2.93,
      7.5: 3.17,
      8: 3.43,
      8.5: 3.71
    },
    {
      time: 14,
      2.5: 1.52,
      3: 1.65,
      3.5: 1.79,
      4: 1.94,
      4.5: 2.1,
      5: 2.28,
      5.5: 2.48,
      6: 2.69,
      6.5: 2.93,
      7: 3.18,
      7.5: 3.46,
      8: 3.77,
      8.5: 4.11
    },
    {
      time: 15,
      2.5: 1.57,
      3: 1.71,
      3.5: 1.86,
      4: 2.03,
      4.5: 2.22,
      5: 2.42,
      5.5: 2.64,
      6: 2.89,
      6.5: 3.16,
      7: 3.45,
      7.5: 3.78,
      8: 4.14,
      8.5: 4.54
    }
  ]

}

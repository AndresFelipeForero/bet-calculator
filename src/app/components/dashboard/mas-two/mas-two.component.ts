import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-mas-two',
  templateUrl: './mas-two.component.html',
  styleUrls: ['./mas-two.component.css']
})
export class MasTwoComponent implements OnInit {

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
  icon: string = "edit"
  
  

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      minutos: [70, [Validators.required, Validators.min(70), Validators.max(85)]],
      golesEscogidos: ["1.5", Validators.required],
      golesMenosEsquinas: ["7", Validators.required],
      extraTime: ["0"],
      segundos: [0, [Validators.required, Validators.min(0), Validators.max(59)]]
    }) 
  }

  ngOnInit(): void { 
    
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
    
    if (this.form.invalid) {return} 
    else {this.hallarGol()}

    console.log(this.form.invalid)
    console.log(this.form.controls["minutos"].errors)
  }
  
  hallarGol(){
    this.cambiarFlag()   
    
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

       
        if (this.flag == true) {
          this.actionBtn = 'Stop';
        }
        if (this.flag == false) {
          this.actionBtn = 'Start';
        }
        
          setInterval(()=>{
            if (minutos == 20 && segundos == 0) {
              y2 = this.datosDirectos[minutos][goles];
              y1 = this.datosDirectos[minutos-1][goles];
              y2E = this.dataMenosEsquinas[minutos][esquinas]; //y2 esquinas
              y1E = this.dataMenosEsquinas[minutos-1][esquinas]; //y2 esquinas
            }
            if (minutos < 20 && minutos >= 4) {
              y2 = this.datosDirectos[minutos][goles];
              y1 = this.datosDirectos[minutos-1][goles];
              y2E = this.dataMenosEsquinas[minutos][esquinas]; //y2 esquinas
              y1E = this.dataMenosEsquinas[minutos-1][esquinas]; //y2 esquinas
            }

            // if (minutos == 10 && segundos == 0) {
              
            //   y2E = this.dataMenosEsquinas[minutos][esquinas]; //y2 esquinas
            //   y1E = this.dataMenosEsquinas[minutos-1][esquinas]; //y2 esquinas
            // }
            // if (minutos < 10 && minutos >= 1) {
              
            //   y2E = this.dataMenosEsquinas[minutos][esquinas]; //y2 esquinas
            //   y1E = this.dataMenosEsquinas[minutos-1][esquinas]; //y2 esquinas
            // }
                       
            if (minutos < 5) {
              y2 = this.datosDirectos[minutos][goles];
              y2E = this.dataMenosEsquinas[minutos][esquinas]; //y2 esquinas
              y1E = this.dataMenosEsquinas[3][esquinas];
              y1 = this.datosDirectos[3][goles];
            }
            
            let m = (y2 - y1)/x;
            b = y2 - m * x;
                
            let mE = (y2E - y1E)/x;
            bE = y2E - mE * x;
        
            if (segundos >= 0 && minutos >=4) {
              if (this.flag == false) {
                segundos = 0;
                minutos= 4;                
              }
              if ( segundos == 0 && minutos == 4) {return}

              this.yF = (m * segundos + b).toFixed(2);
              this.yFE = (mE * segundos + bE).toFixed(2);
              segundos = segundos - 1;            
              this.showTime = `${minutos} : ${segundos}`;
              console.log(minutos , segundos);
                               
              if (segundos == 0) { 
                if ( segundos == 0 && minutos == 4) {return} 
                         
                minutos = minutos -1
                segundos = 60
              }
              
            }
          },1000)               
              
  }


  cambiarFlag(){
    this.flag=!this.flag    
  }

  changeName(){
    let $inputTitle = document.querySelector(".title-5")!
    if ($inputTitle.toggleAttribute("disabled")) {
      this.icon = "edit"    
    } else {
      this.icon = "save"  
    }
  }

  dataMenosEsquinas: any[]= [
    {
      7: 0,  
      8: 0,  
      9: 0,  
      10: 0, 
      11: 0, 
      time: 1,    
      7.5: 0,
      8.5: 0,
      9.5: 0,
      10.5: 0
    },
    {},
    {},
    {
      7: 3.64,  
      8: 3.24,  
      9: 2.93,  
      10: 2.68, 
      11: 2.47, 
      time: 4,    
      7.5: 3.43,
      8.5: 3.07,
      9.5: 2.79,
      10.5: 2.57
    },
    {
      7: 3.03,
      8: 2.71,
      9: 2.46,
      10: 2.31,
      11: 2.14,
      time: 5,
      7.5: 2.85,
      8.5: 2.57,
      9.5: 2.4,
      10.5: 2.22
    },
    {
      7: 2.64,
      8: 2.4,
      9: 2.19,
      10: 2.02,
      11: 1.88,
      time: 6,
      7.5: 2.49,
      8.5: 2.29,
      9.5: 2.1,
      10.5: 1.94
    },
    {
      7: 2.38,
      8: 2.14,
      9: 1.96,
      10: 1.84,
      11: 1.72,
      time: 7,
      7.5: 2.25,
      8.5: 2.04,
      9.5: 1.88,
      10.5: 1.77
    },
    {
      7: 2.15,
      8: 1.94,
      9: 1.81,
      10: 1.68,
      11: 1.58,
      time: 8,
      7.5: 2.04,
      8.5: 1.86,
      9.5: 1.74,
      10.5: 1.63
    },
    {
      7: 1.97,
      8: 1.82,
      9: 1.68,
      10: 1.57,
      11: 1.49,
      time: 9,
      7.5: 1.87,
      8.5: 1.75,
      9.5: 1.62,
      10.5: 1.54
    },
    {
      7: 1.86,
      8: 1.69,
      9: 1.57,
      10: 1.49,
      11: 1.41,
      time: 10,
      7.5: 1.77,
      8.5: 1.63,
      9.5: 1.53,
      10.5: 1.44
    },
    {
      7: 1.74,
      8: 1.59,
      9: 1.49,
      10: 1.41,
      11: 1.34,
      time: 11,
      7.5: 1.66,
      8.5: 1.55,
      9.5: 1.45,
      10.5: 1.38
    },
    {
      7: 1.65,
      8: 1.53,
      9: 1.43,
      10: 1.36,
      11: 1.29,
      time: 12,
      7.5: 1.57,
      8.5: 1.47,
      9.5: 1.38,
      10.5: 1.32
    },
    {
      7: 1.57,
      8: 1.46,
      9: 1.38,
      10: 1.31,
      11: 1.26,
      time: 13,
      7.5: 1.52,
      8.5: 1.41,
      9.5: 1.34,
      10.5: 1.28
    },
    {
      7: 1.52,
      8: 1.41,
      9: 1.33,
      10: 1.28,
      11: 1.22,
      time: 14,
      7.5: 1.46,
      8.5: 1.37,
      9.5: 1.3,
      10.5: 1.25
    },
    {
      7: 1.45,
      8: 1.36,
      9: 1.28,
      10: 1.23,
      11: 1.19,
      time: 15,
      7.5: 1.4,
      8.5: 1.32,
      9.5: 1.26,
      10.5: 1.21
    },
    {
      7: 1.4,
      8: 1.32,
      9: 1.25,
      10: 1.2,
      11: 1.16,
      time: 16,
      7.5: 1.36,
      8.5: 1.29,
      9.5: 1.22,
      10.5: 1.18
    },
    {
      7: 1.37,
      8: 1.29,
      9: 1.22,
      10: 1.18,
      11: 1.14,
      time: 17,
      7.5: 1.32,
      8.5: 1.25,
      9.5: 1.2,
      10.5: 1.16
    },
    {
      7: 1.33,
      8: 1.26,
      9: 1.2,
      10: 1.15,
      11: 1.12,
      time: 18,
      7.5: 1.29,
      8.5: 1.22,
      9.5: 1.18,
      10.5: 1.14
    },
    {
      7: 1.3,
      8: 1.23,
      9: 1.18,
      10: 1.14,
      11: 1.11,
      time: 19,
      7.5: 1.26,
      8.5: 1.2,
      9.5: 1.16,
      10.5: 1.12
    },
    {
      7: 1.28,
      8: 1.21,
      9: 1.16,
      10: 1.12,
      11: 1.09,
      time: 20,
      7.5: 1.26,
      8.5: 1.18,
      9.5: 1.14,
      10.5: 1.11
    }
  ]

  datosDirectos: any[] = [
    {2: 0,  
      3: 0,   
      4: 0,   
      time: 0,     
      1.5: 0,
      2.5: 0, 
      3.5: 0},
    {},
    {},
    {
      2: 10.86,  
      3: 7.53,   
      4: 5.82,   
      time: 4,     
      1.5: 13.84,
      2.5: 8.83, 
      3.5: 6.54  
    },
    {
      2: 8.79,   
      3: 6.13,   
      4: 4.76,   
      time: 5,
      1.5: 11.17,
      2.5: 7.17,
      3.5: 5.34
    },
    {
      2: 7.41,
      3: 5.2,
      4: 4.06,
      time: 6,
      1.5: 9.4,
      2.5: 6.06,
      3.5: 4.54
    },
    {
      2: 6.43,
      3: 4.53,
      4: 3.56,
      time: 7,
      1.5: 8.13,
      2.5: 5.27,
      3.5: 3.97
    },
    {
      2: 5.69,
      3: 4.03,
      4: 3.18,
      time: 8,
      1.5: 7.18,
      2.5: 4.68,
      3.5: 3.54
    },
    {
      2: 5.12,
      3: 3.65,
      4: 2.89,
      time: 9,
      1.5: 6.44,
      2.5: 4.22,
      3.5: 3.21
    },
    {
      2: 4.66,
      3: 3.34,
      4: 2.66,
      time: 10,
      1.5: 5.85,
      2.5: 3.85,
      3.5: 2.94
    },
    {
      2: 4.28,
      3: 3.09,
      4: 2.47,
      time: 11,
      1.5: 5.36,
      2.5: 3.55,
      3.5: 2.73
    },
    {
      2: 3.97,
      3: 2.88,
      4: 2.31,
      time: 12,
      1.5: 4.96,
      2.5: 3.3,
      3.5: 2.55
    },
    {
      2: 3.71,
      3: 2.7,
      4: 2.18,
      time: 13,
      1.5: 4.62,
      2.5: 3.09,
      3.5: 2.4
    },
    {
      2: 3.48,
      3: 2.55,
      4: 2.07,
      time: 14,
      1.5: 4.33,
      2.5: 2.91,
      3.5: 2.27
    },
    {
      2: 3.29,
      3: 2.42,
      4: 1.97,
      time: 15,
      1.5: 4.08,
      2.5: 2.76,
      3.5: 2.16
    },
    {
      2: 3.12,
      3: 2.3,
      4: 1.89,
      time: 16,
      1.5: 3.86,
      2.5: 2.62,
      3.5: 2.06
    },
    {
      2: 2.97,
      3: 2.2,
      4: 1.81,
      time: 17,
      1.5: 3.66,
      2.5: 2.5,
      3.5: 1.98
    },
    {
      2: 2.84,
      3: 2.11,
      4: 1.75,
      time: 18,
      1.5: 3.49,
      2.5: 2.39,
      3.5: 1.9
    },
    {
      2: 2.72,
      3: 2.03,
      4: 1.69,
      time: 19,
      1.5: 3.34,
      2.5: 2.3,
      3.5: 1.83
    },
    {
      2: 2.61,
      3: 1.96,
      4: 1.64,
      time: 20,
      1.5: 3.2,
      2.5: 2.21,
      3.5: 1.77
    }
  ]

}

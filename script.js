const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    this.inicializar();
    setTimeout(() => {
      this.generarSecuencia();
      this.siguienteNivel();  
    }, 1000);
    
  }

  inicializar() {
    this.siguienteNivel =  this.siguienteNivel.bind(this)
    this.elegirColor= this.elegirColor.bind(this) // <- se utiliza .bind(this) para decir que this seguira ciendo la clase y no el boton cuando se le de click
    

    btnEmpezar.classList.add('hide');
    this.nivel = 1;
    this.colores = { // <-- sin necesidad de colocar celeste: celeste , para hacer referencia a la constante de arriba
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
  }

  siguienteNivel(){
    this.subnivel = 0;
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  transformarNumeroAColor(numero){
    switch (numero) {
      case 0:
        return 'celeste';
      
      case 1:
        return 'violeta';

      case 2:
        return 'naranja';

      case 3:
        return 'verde';
    
      default:
        break;
    }
  }

  transformarColorANumero(color){
    switch (color) {
      case 'celeste':
        return 0;
      
      case 'violeta':
        return 1;

      case 'naranja':
        return 2;

      case 'verde':
        return 3;
    
      default:
        break;
    }
  }

  iluminarColor(color){
    this.colores[color].classList.add('light')

    setTimeout(() => {
      this.apagarColor(color)
    }, 350);
  }

  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  iluminarSecuencia(){
    for (let index = 0; index < this.nivel; index++) {
      const element = this.secuencia[index]; // <-- Obtine un numero de la secuencia Random

      let color = this.transformarNumeroAColor(element); // <-- Transforma el numero a un color

      setTimeout(() => {
        this.iluminarColor(color);  // Ilumina el color correspondiente
      }, 1000 * index); // <-- * i para que se ejecute             
    }
  }


  agregarEventosClick(){
    this.colores.celeste.addEventListener('click',this.elegirColor);
    this.colores.verde.addEventListener('click',this.elegirColor);
    this.colores.violeta.addEventListener('click',this.elegirColor);
    this.colores.naranja.addEventListener('click',this.elegirColor);
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click',this.elegirColor);
    this.colores.verde.removeEventListener('click',this.elegirColor);
    this.colores.violeta.removeEventListener('click',this.elegirColor);
    this.colores.naranja.removeEventListener('click',this.elegirColor);
  }

  elegirColor(event){
    const nombreColor = event.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);

    this.iluminarColor(nombreColor);

    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;

      if(this.subnivel === this.nivel){
        this.nivel++;

        this.eliminarEventosClick();

        if (this.nivel == (ULTIMO_NIVEL + 1)) {
           // Ganó
           swal('Ganaste',':)','success')
            .then(()=>{
              location.reload();
            })
        }else{         
             // Avanza de nivel  
            swal('Pasas al nivel '+ this.nivel)
              .then(()=> {
                setTimeout(() => {
                  this.siguienteNivel()  
                }, 1000);
                
              })          
        }
      }
    }else{
      // Perdió
      swal('Perdiste',':(','error')
        .then(()=>{
          location.reload();
        })
    }

  }

}




function empezarJuego() {  
    var juego = new Juego();    
}
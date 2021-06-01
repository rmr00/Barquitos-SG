import * as THREE from '../libs/three.module.js';
import {Box} from './Box.js';
import {BarcoPescador} from "./barcos/BarcoPescador.js";
import {BarcoBote} from "./barcos/BarcoBote.js";
import {Submarino} from "./barcos/Submarino.js";
import {BarcoGuerra} from "./barcos/BarcoGuerra.js";
import {BarcoPirata} from "./barcos/BarcoPirata.js";

export class Tablero extends THREE.Object3D {
    constructor() {
        super();
        this.FILAS = 10;
        this.COLS = 8;
        this.raycaster = new THREE.Raycaster();
        let matCuadrados = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.7});

        this.lado = 5;

        this.tablero = new THREE.Object3D();

        //Se guardan las cajas
        this.boxesArray = [];

        this.construirBarcos();

        for (let i = 0; i < this.FILAS; i++) {
            for (let j = 0; j < this.COLS; j++) {

                //let posicion = new THREE.Vector3(this.lado / 2 + this.lado * j, this.lado / 2 + this.lado * i, 0);

                //let box = new THREE.Mesh(new THREE.BoxGeometry(this.lado, this.lado, this.lado), matCuadrados);
                let box = new Box(this.lado,this.lado / 2 + this.lado * j,this.lado / 2 + this.lado * i,0 ,i,j);

                //situarlo en el tablero
                //box.position.set(posicion.x, posicion.y, posicion.z);
                //let geo = new THREE.EdgesGeometry(box.geometry);
                //let mat = new THREE.LineBasicMaterial({color: 0x0001110, linewidth: 6});
                //let wireframe = new THREE.LineSegments(geo, mat);
                //wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
                //box.add(wireframe);

                this.boxesArray.push(box);
                this.tablero.add(box);

            }
        }

        this.add(this.tablero);

    }

    construirBarcos() {
        this.barcos = [];
        this.barcos.push(new BarcoBote(this.lado));
        this.barcos.push(new BarcoPescador(this.lado));
        this.barcos.push(new Submarino(this.lado));
        this.barcos.push(new BarcoGuerra(this.lado));
        this.barcos.push(new BarcoPirata(this.lado));
    }

    cambaiarColor(f,c){
        //(fila a la que se quiere acceder * número de columnas de la matriz ) + columna a la que se quiere acceder

        this.boxesArray[(f*this.COLS)+c].over();
    }


    marcarCasillasAlrededorX(f, c, n){

        console.log("------Para ("+(f)+","+(c)+") --------");

        //En la fila superior
        if( f < this.FILAS-1 ){

            if(c == 0 ){ //Si esta junto al borde izquierdo

                for(let i = c; i < c+n+1; i++) {
                    console.log("marcando casilla ("+(f+1)+","+i+") como alrededor");
                    this.boxesArray[((f+1) * this.COLS) + i].marcarCasillaAlrededor();
                }

            }
            else if(c+n-1 == this.COLS-1 ){  //Si esta junto al borde derecho
                for(let i = c-1; i < c+n; i++) {
                    console.log("marcando casilla ("+(f+1)+","+i+") como alrededor");
                    this.boxesArray[((f+1) * this.COLS) + i].marcarCasillaAlrededor();
                }
            }
            else{ //En caso contrario
                for(let i = c-1; i < c+n+1; i++) {
                    console.log("marcando casilla ("+(f+1)+","+i+") como alrededor");
                    this.boxesArray[((f+1) * this.COLS) + i].marcarCasillaAlrededor();
                }
            }
        }

        //En la fila inferior
        if( f > 0 ){
            //Si la fila actual es mayor a la fila 0 entonces tengo que comprobar la fila de abajo
            //En caso contrario no porque no existe esa fila en el tablero

            if(c == 0 ){ //Si esta junto al borde izquierdo

                for(let i = c; i < c+n+1; i++) {
                    console.log("marcando casilla ("+(f-1)+","+i+") como alrededor");
                    this.boxesArray[((f-1) * this.COLS) + i].marcarCasillaAlrededor();
                }

            }
            else if(c+n-1 == this.COLS-1 ){  //Si esta junto al borde derecho
                for(let i = c-1; i < c+n; i++) {
                    console.log("marcando casilla ("+(f-1)+","+i+") como alrededor");
                    this.boxesArray[((f-1) * this.COLS) + i].marcarCasillaAlrededor();
                }
            }
            else{ //En caso contrario
                for(let i = c-1; i < c+n+1; i++) {
                    console.log("marcando casilla ("+(f-1)+","+i+") como alrededor");
                    this.boxesArray[((f-1) * this.COLS) + i].marcarCasillaAlrededor();;
                }
            }
        }

        //En la misma fila la columna anterior
        if( c > 0 ){ //Si no esta en el borde izquierdo
            console.log("marcando casilla ("+f+","+(c-1)+") como alrededor");
            this.boxesArray[(f * this.COLS) + c-1].marcarCasillaAlrededor();
        }

        //En la misma fila la columna siguiente
        if( c+n-1 < this.COLS-1 ){ //Si no está en el borde derecho
            console.log("marcando casilla ("+f+","+(c+n)+") como alrededor");
            this.boxesArray[(f * this.COLS) + c+n].marcarCasillaAlrededor();
        }
    }

    marcarCasillasAlrededorY(f, c, n){

        console.log("------Para ("+(f)+","+(c)+") --------");

        //En la siguiente columna
        if( c < this.COLS-1 ){

            if(f == 0 ){ //Si esta junto al borde inferior

                for(let i = f; i < f+n+1; i++) {
                    console.log("marcando casilla ("+i+","+(c+1)+") como alrededor");
                    this.boxesArray[(i * this.COLS) + (c+1)].marcarCasillaAlrededor();
                }

            }
            else if(f+n-1 == this.FILAS-1 ){  //Si esta junto al borde superior
                for(let i = f-1; i < f+n; i++) {
                    console.log("marcando casilla ("+i+","+(c+1)+") como alrededor");
                    this.boxesArray[(i * this.COLS) + (c+1)].marcarCasillaAlrededor();
                }
            }
            else{ //En caso contrario
                for(let i = f-1; i < f+n+1; i++) {
                    console.log("marcando casilla ("+i+","+(c+1)+") como alrededor");
                    this.boxesArray[(i * this.COLS) + (c+1)].marcarCasillaAlrededor();
                }
            }
        }

        //En la columna anterior
        if( c > 0 ){

            if(f == 0 ){ //Si esta junto al borde inferior

                for(let i = f; i < f+n+1; i++) {
                    console.log("marcando casilla ("+i+","+(c-1)+") como alrededor");
                    this.boxesArray[(i * this.COLS) + (c-1)].marcarCasillaAlrededor();
                }

            }
            else if(f+n-1 == this.FILAS-1 ){  //Si esta junto al borde superior
                for(let i = f-1; i < f+n; i++) {
                    console.log("marcando casilla ("+i+","+(c-1)+") como alrededor");
                    this.boxesArray[(i * this.COLS) + (c-1)].marcarCasillaAlrededor();
                }
            }
            else{ //En caso contrario
                for(let i = f-1; i < f+n+1; i++) {
                    console.log("marcando casilla ("+i+","+(c-1)+") como alrededor");
                    this.boxesArray[(i * this.COLS) + (c-1)].marcarCasillaAlrededor();
                }
            }
        }

        //En la misma columna la casilla anterior
        if( f > 0 ){ //Si no está en el borde inferior
            console.log("marcando casilla ("+(f-1)+","+(c)+") como alrededor");
            this.boxesArray[((f-1) * this.COLS) + c].marcarCasillaAlrededor();
        }

        //En la misma columna la casilla siguiente
        if( f+n-1 < this.FILAS-1 ){ //Si no está en el borde superior
            console.log("marcando casilla ("+(f+n)+","+(c)+") como alrededor");
            this.boxesArray[((f+n) * this.COLS) + c].marcarCasillaAlrededor();
        }
    }

    overXNewShip(f, c, n){
        //(fila a la que se quiere acceder * número de columnas de la matriz ) + columna a la que se quiere acceder

        var wrong = false;

        //1.Mirar si se salen del tablero
        if(c+n > this.COLS ){  //Si se sale del tablero
            for(let i = 0; i < this.COLS-c; i++) {
                this.boxesArray[(f * this.COLS) + c + i].overWrong();
            }
        }
        else{
            //2.Mirar si ya están ocupadas por un barco o tienen un barco alrededor
            for(let i = 0; i < n && !wrong ; i++) {
                if( this.boxesArray[(f * this.COLS) + (c+i)].tieneBarco || this.boxesArray[(f * this.COLS) + (c+i)].tieneBarcoAlrededor){
                    wrong=true;
                }
            }

            if(wrong){
                for (let i = 0; i < n; i++) {
                    this.boxesArray[(f * this.COLS) + c + i].overWrong();
                }
            }else{
                for (let i = 0; i < n; i++) {
                    this.boxesArray[(f * this.COLS) + c + i].overRight();
                }
            }
        }

    }

    /**
     * Hace reset de todo el tablero menos la posición indicada o
     * la ocupada por los barcos.
     * @param f fila
     * @param c columna
     * @param n ocupación de cuadros.
     */
    resetOverX(f,c,n=1){
        for (let i = 0; i < this.boxesArray.length; i++) {
            if(this.boxesArray[i].fila != f){ //Si no pertenecen a la misma fila
                this.boxesArray[i].resetMaterial();
            }
            else if( (this.boxesArray[i].fila == f) && (this.boxesArray[i].columna < c) ){ //Si pertenecen a la misma fila y son anteriores
                this.boxesArray[i].resetMaterial();
            }
            else if( (this.boxesArray[i].fila == f) && (this.boxesArray[i].columna > c+n-1) ){ //Si pertenecen a la misma fila y son posteriores
                this.boxesArray[i].resetMaterial();
            }

        }
    }

    overYNewShift(f, c, n){
        //(fila a la que se quiere acceder * número de columnas de la matriz ) + columna a la que se quiere acceder

        if(f+n > this.FILAS ){
            for(let i = 0; i < this.FILAS-f; i++) {
                this.boxesArray[( (f+i) * this.COLS) + c].overWrong();
            }
        }
        else{
            for(let i = 0; i < n; i++) {
                this.boxesArray[((f+i) * this.COLS) + c].overRight();
            }
        }

        var wrong = false;

        //1.Mirar si se salen del tablero
        if(f+n > this.FILAS ){ //Si se sale del tablero
            for(let i = 0; i < this.FILAS-f; i++) {
                this.boxesArray[( (f+i) * this.COLS) + c].overWrong();
            }
        }
        else{
            //2.Mirar si ya están ocupadas por un barco o tienen un barco alrededor
            for(let i = 0; i < n && !wrong ; i++) {
                if( this.boxesArray[( (f+i) * this.COLS) + c].tieneBarco || this.boxesArray[( (f+i) * this.COLS) + c].tieneBarcoAlrededor){
                    wrong=true;
                }
            }

            if(wrong){
                for(let i = 0; i < n; i++) {
                    this.boxesArray[( (f+i) * this.COLS) + c].overWrong();
                }
            }
            else{
                for(let i = 0; i < n; i++) {
                    this.boxesArray[((f+i) * this.COLS) + c].overRight();
                }
            }
        }
    }


    resetOverY(f,c,n=1){
        for (let i = 0; i < this.boxesArray.length; i++) {
            if(this.boxesArray[i].columna != c){ //Si no pertenecen a la misma columna
                this.boxesArray[i].resetMaterial();
            }
            else if( (this.boxesArray[i].columna == c) && (this.boxesArray[i].fila < f) ){ //Si pertenecen a la misma columna y son anteriores
                this.boxesArray[i].resetMaterial();
            }
            else if( (this.boxesArray[i].columna == c) && (this.boxesArray[i].fila > (f+n-1)) ){ //Si pertenecen a la misma columna y son posteriores
                this.boxesArray[i].resetMaterial();
            }
        }
    }


    selectXNewShip(f, c, n) {
        //(fila a la que se quiere acceder * número de columnas de la matriz ) + columna a la que se quiere acceder
        let salida = false;

        var seleccionables=true;

        //1.Mirar si se salen del tablero
        if(c+n > this.COLS ) {
            seleccionables=false;
        }

        //2.Mirar si ya están seleccionadas o si al rededor ya tienen un barco
        //console.log("--f:"+f+" c="+c+" n="+n)
        for(let i = 0; i < n && seleccionables; i++) {
            //console.log("compruebo: f="+f+" c="+(c+i))
            if( this.boxesArray[(f * this.COLS) + (c+i)].tieneBarco || this.boxesArray[(f * this.COLS) + (c+i)].tieneBarcoAlrededor ){
                seleccionables=false;
            }
        }

        //3. Mirar si se salen del tablero y si no seleccionar
        if( seleccionables ){
            for(let i = 0; i < n; i++) {
                this.boxesArray[(f * this.COLS) + c + i].posicionarBarco(n);
            }
            //Se marcan las casillas de alrededor
            this.marcarCasillasAlrededorX(f, c, n);

            //Se posiciona el barco
            this.barcos[n - 2].position.x += c * this.lado;
            this.barcos[n - 2].position.y += f * this.lado;
            this.add(this.barcos[n - 2]);
            salida = true;
        }
        return salida;
    }


    selectYNewShip(f, c, n){
        //(fila a la que se quiere acceder * número de columnas de la matriz ) + columna a la que se quiere acceder
        let salida = false;
        //Mirar si se pueden seleccionar
        var seleccionables=true;

        //1.Mirar si se salen del tablero
        if(f+n > this.FILAS ) {
            seleccionables=false;
        }
        //2.Mirar si ya están seleccionadas
        for(let i = 0; i < n && seleccionables; i++) {
            //console.log("compruebo: f="+f+i+" c="+c)
            if( this.boxesArray[( (f+i) * this.COLS) + c].tieneBarco || this.boxesArray[( (f+i) * this.COLS) + c].tieneBarcoAlrededor ){
                seleccionables=false;
                //console.log("no se puede: f="+(f+i)+" c="+c)
            }
        }

        //3. seleccionar
        if(seleccionables) {
            for(let i = 0; i < n; i++) {
                //console.log("compruebo: f="+(f+i)+" c="+c)
                this.boxesArray[( (f+i) * this.COLS) + c].posicionarBarco(n);
            }

            //Se marcan las casillas de alrededor
            this.marcarCasillasAlrededorY(f, c, n);

            //Se posiciona el barco
            this.barcos[n - 2].position.x += ( c + 1 ) * this.lado;
            this.barcos[n - 2].position.y += f * this.lado;
            this.barcos[n - 2].rotation.z += Math.PI / 2;
            this.add(this.barcos[n - 2]);
            salida = true;
        }

        return salida;
    }

    _comprobarHundido(barco) {
        let hundido = false;
        let cont = 0;
        for(let i=0; i<this.boxesArray.length; i++) {
            if(this.boxesArray[i].barcoContenido == barco && this.boxesArray[i].disparado ) cont++;
        }

        if(cont == barco) hundido = true;
        return hundido;
    }

    _hundirBarco(barco) {
        console.log('LLAMO A HUNDIR BARCO')
        this.barcos[barco - 2].hundir();
    }

    shoot(f, c) {
        if(!this.boxesArray[f * this.COLS + c].disparado) {
            this.boxesArray[f * this.COLS + c].shoot();
            let barco = this.boxesArray[f * this.COLS + c].barcoContenido;
            if(barco != null) {
                if(this._comprobarHundido(barco)) this._hundirBarco(barco);
            }
        }
    }


    cleanOver(){
        for (let i = 0; i < this.boxesArray.length; i++) {
            this.boxesArray[i].resetMaterial();
        }
    }



    /**
     * It returns the position of the mouse in normalized coordinates ([-1,1],[-1,1])
     * @param event - Mouse information
     * @return A Vector2 with the normalized mouse position
     */
    getMouse(event) {
        var mouse = new THREE.Vector2 ();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
        return mouse;
    }

    update() {

    }
}
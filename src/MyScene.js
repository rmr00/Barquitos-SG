// Clases de la biblioteca

import * as THREE from '../libs/three.module.js';
import {GUI} from '../libs/dat.gui.module.js';
import {TrackballControls} from '../libs/TrackballControls.js';
import {Tablero} from './Tablero.js';
import { Jugador } from './Jugador.js';

import {Box} from './Box.js';
class MyScene extends THREE.Scene {
    constructor(myCanvas) {
        super();

        // Attributes
        this.applicationMode = MyScene.NO_ACTION;
        this.mouseDown = false;
        this.cameraControl = null;

        // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
        this.renderer = this.createRenderer(myCanvas);

        // Se crea la interfaz gráfica de usuario
        this.gui = this.createGUI();

        // Construimos los distinos elementos que tendremos en la escena
        //this.createGround();
        // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
        // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
        this.createLights();

        // Tendremos una cámara con un control de movimiento con el ratón
        this.createCamera();

        // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
        this.axis = new THREE.AxesHelper(15);
        this.add(this.axis);
        this.jugadores = [];
        //this.cargarNombres()

        // Tablero
        this.tablero = new Tablero();
        this.add(this.tablero);
    }

    cargarNombres() {
        let person1 = prompt("Nombre jugador 1", "");
        this.jugadores.push(new Jugador(person1));
        let person2 = prompt("Nombre jugador 2", "");
        this.jugadores.push(new Jugador(person2));
        console.log(this.jugadores)
    }

    createCamera() {
        // Para crear una cámara le indicamos
        //   El ángulo del campo de visión en grados sexagesimales
        //   La razón de aspecto ancho/alto
        //   Los planos de recorte cercano y lejano
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        // También se indica dónde se coloca
        this.camera.position.set(20, 10, 20);
        // Y hacia dónde mira
        var look = new THREE.Vector3(0, 0, 0);
        this.camera.lookAt(look);
        this.add(this.camera);

        // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
        this.cameraControl = new TrackballControls(this.camera, this.renderer.domElement);
        // Se configuran las velocidades de los movimientos
        this.cameraControl.rotateSpeed = 5;
        this.cameraControl.zoomSpeed = -2;
        this.cameraControl.panSpeed = 0.5;
        // Debe orbitar con respecto al punto de mira de la cámara
        this.cameraControl.target = look;
        this.cameraControl.enabled = false;
    }

    createGround() {
        // El suelo es un Mesh, necesita una geometría y un material.

        // La geometría es una caja con muy poca altura
        var geometryGround = new THREE.BoxGeometry(50, 0.2, 50);

        // El material se hará con una textura de madera
        var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
        var materialGround = new THREE.MeshPhongMaterial({map: texture});

        // Ya se puede construir el Mesh
        var ground = new THREE.Mesh(geometryGround, materialGround);

        // Todas las figuras se crean centradas en el origen.
        // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
        ground.position.y = -0.1;

        // Que no se nos olvide añadirlo a la escena, que en este caso es  this
        this.add(ground);
    }

    createGUI() {
        // Se crea la interfaz gráfica de usuario
        var gui = new GUI();

        // La escena le va a añadir sus propios controles.
        // Se definen mediante una   new function()
        // En este caso la intensidad de la luz y si se muestran o no los ejes
        this.guiControls = new function () {
            // En el contexto de una función   this   alude a la función
            this.lightIntensity = 0.5;
            this.axisOnOff = true;
            this.new_ship2 = false;
            this.new_ship3 = false;
            this.new_ship4 = false;
            this.new_ship5 = false;
            this.new_ship6 = false;
        }

        var that = this;

        // Se crea una sección para los controles de esta clase
        var folder = gui.addFolder('Luz y Ejes');

        // Se le añade un control para la intensidad de la luz
        folder.add(this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');

        // Y otro para mostrar u ocultar los ejes
        folder.add(this.guiControls, 'axisOnOff').name('Mostrar ejes : ');

        //
        gui.add(this.guiControls, 'new_ship2').name('Añadir barco 1 : ').listen().onChange( function(new_ship2){
            MyScene.NEW_SHIP=2;
            console.log( MyScene.NEW_SHIP );
            that.new_ship3 = false;
            that.new_ship4 = false;
            that.new_ship5 = false;
            that.new_ship6 = false;
        });

        //
        gui.add(this.guiControls, 'new_ship3').name('Añadir barco 2 : ').listen().onChange( function(new_ship3){
            MyScene.NEW_SHIP=3;
            console.log( MyScene.NEW_SHIP );
            that.new_ship2 = false;
            that.new_ship4 = false;
            that.new_ship5 = false;
            that.new_ship6 = false;
        });

        //
        gui.add(this.guiControls, 'new_ship4').name('Añadir barco 3 : ').listen().onChange( function(new_ship4){
            MyScene.NEW_SHIP=4;
            console.log( MyScene.NEW_SHIP );
            that.new_ship2 = false;
            that.new_ship3 = false;
            that.new_ship5 = false;
            that.new_ship6 = false;
        });

        //
        gui.add(this.guiControls, 'new_ship5').name('Añadir barco 4 : ').listen().onChange( function(new_ship5){
            MyScene.NEW_SHIP=5;
            console.log( MyScene.NEW_SHIP );
            that.new_ship2 = false;
            that.new_ship3 = false;
            that.new_ship4 = false;
            that.new_ship6 = false;
        });

        //
        gui.add(this.guiControls, 'new_ship6').name('Añadir barco 5 : ').listen().onChange( function(new_ship6){
            MyScene.NEW_SHIP=6;
            console.log( MyScene.NEW_SHIP );
            that.new_ship2 = false;
            that.new_ship3 = false;
            that.new_ship4 = false;
            that.new_ship5 = false;
        });

        return gui;
    }

    createLights() {
        // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
        // La luz ambiental solo tiene un color y una intensidad
        // Se declara como   var   y va a ser una variable local a este método
        //    se hace así puesto que no va a ser accedida desde otros métodos
        var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
        // La añadimos a la escena
        this.add(ambientLight);

        // Se crea una luz focal que va a ser la luz principal de la escena
        // La luz focal, además tiene una posición, y un punto de mira
        // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
        // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
        this.spotLight = new THREE.SpotLight(0xffffff, this.guiControls.lightIntensity);
        this.spotLight.position.set(60, 60, 40);
        this.add(this.spotLight);
    }

    createRenderer(myCanvas) {
        // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

        // Se instancia un Renderer   WebGL
        var renderer = new THREE.WebGLRenderer();

        // Se establece un color de fondo en las imágenes que genera el render
        renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

        // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
        renderer.setSize(window.innerWidth, window.innerHeight);

        // La visualización se muestra en el lienzo recibido
        $(myCanvas).append(renderer.domElement);

        return renderer;
    }

    getCamera() {
        // En principio se devuelve la única cámara que tenemos
        // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
        return this.camera;
    }

    getCameraControls(){
        return this.cameraControl;
    }

    setCameraAspect(ratio) {
        // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
        // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
        this.camera.aspect = ratio;
        // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
        this.camera.updateProjectionMatrix();
    }

    onWindowResize() {
        // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
        // Hay que actualizar el ratio de aspecto de la cámara
        this.setCameraAspect(window.innerWidth / window.innerHeight);

        // Y también el tamaño del renderizador
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    update() {
        // Se actualizan los elementos de la escena para cada frame
        // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
        this.spotLight.intensity = this.guiControls.lightIntensity;

        // Se muestran o no los ejes según lo que idique la GUI
        this.axis.visible = this.guiControls.axisOnOff;

        // Se actualiza la posición de la cámara según su controlador
        this.cameraControl.update();

        // Se actualiza el resto del modelo
        this.tablero.update();


        // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
        this.renderer.render(this, this.getCamera());

        // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
        // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
        // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
        requestAnimationFrame(() => this.update())
    }


    //---------INTERACCIÓN RATON/TECLADO--------------------------

    onMouseDown (event) {
        //console.log( "funciona1" );
        if (event.button === 0) {   // Left button

            if(MyScene.NEW_SHIP > 0){
                this.mouseDown = true;
                //console.log( "funciona2" );
                //Saber en qué píxel se ha hecho clic
                //Lanzar un rayo Desde la cámara que pase por dicho píxel
                //Obtener los objetos alcanzados por ese rayoNormalmente el seleccionado es el más cercano
                var mouse =new THREE.Vector2() ;
                mouse.x = (event.clientX/window.innerWidth)*2 - 1 ;
                mouse.y = 1-2*(event.clientY/window.innerHeight);

                var raycaster = new THREE.Raycaster() ;
                raycaster.setFromCamera(mouse,this.camera);


                var pickableObjects = [];

                //Se añaden las cajas del tablero
                var i = 0;

                for(i; i < this.tablero.boxesArray.length; i++){
                    pickableObjects.push(this.tablero.boxesArray[i]);
                }

                this.pickedObjects = raycaster.intersectObjects(pickableObjects,true);


                if(this.pickedObjects.length > 0){
                    this.selectedObject = this.pickedObjects[0].object;

                    let parar = false;
                    for(i = 0; i < this.tablero.boxesArray.length && !parar; i++){
                        if (this.tablero.boxesArray[i].getPosition().x == this.selectedObject.position.x && this.tablero.boxesArray[i].getPosition().y == this.selectedObject.position.y &&
                            this.tablero.boxesArray[i].getPosition().z == this.selectedObject.position.z) {
                            this.foundBox = this.tablero.boxesArray[i];  //Hemos encontrado la caja

                            if( MyScene.HORIZONTAL ){
                                console.log(MyScene.NEW_SHIP);
                                this.tablero.selectX(this.foundBox.fila, this.foundBox.columna,MyScene.NEW_SHIP);
                                //this.tablero.resetOverX(this.foundBox.fila, this.foundBox.columna,MyScene.NEW_SHIP);
                            }
                            else{
                                console.log(MyScene.NEW_SHIP);
                                this.tablero.selectY(this.foundBox.fila, this.foundBox.columna,MyScene.NEW_SHIP);
                                //this.tablero.resetOverY(this.foundBox.fila, this.foundBox.columna,MyScene.NEW_SHIP);
                            }

                            /*
                            if( !this.foundBox.seleccionado ){
                                this.foundBox.select();
                            }
                            else{
                                this.foundBox.deselect();
                            }
                            */
                            //this.foundBox.cambiarMaterial();
                            //console.log("estoy en if")
                            parar = true;
                        }
                    }
                    /*
                    let boxGeometry = new THREE.BoxGeometry(3,3,3);
                    let boxMaterial = new THREE.MeshPhongMaterial({color: 0xCF0000});

                    let boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
                    boxMesh.position.x = this.selectedObject.x;
                    boxMesh.position.y = this.selectedObject.y;
                    boxMesh.position.z = this.selectedObject.z;

                    this.add(boxMesh);*/
                }
            }

        } else {
            this.applicationMode = MyScene.NO_ACTION;
        }
    }

    onMouseUp (event) {
        if (this.mouseDown) {
            this.mouseDown = false;
        }
    }

    onMouseMove (event) {
        if (this.mouseDown) {
            /*
            switch (this.applicationMode) {
                case TheScene.ADDING_BOXES :
                case TheScene.MOVING_BOXES :
                    this.moveBox (event, TheScene.MOVE_BOX);
                    break;
                default :
                    this.applicationMode = TheScene.NO_ACTION;
                    break;
            }*/
        }
        else{
            var mouse =new THREE.Vector2() ;
            mouse.x = (event.clientX/window.innerWidth)*2 - 1 ;
            mouse.y = 1-2*(event.clientY/window.innerHeight);

            var raycaster = new THREE.Raycaster() ;
            raycaster.setFromCamera(mouse,this.camera);


            var pickableObjects = [];

            //Se añaden las cajas del tablero
            var i = 0;

            for(i; i < this.tablero.boxesArray.length; i++){
                pickableObjects.push(this.tablero.boxesArray[i]);
            }

            this.pickedObjects = raycaster.intersectObjects(pickableObjects,true);


            if(this.pickedObjects.length > 0){
                this.selectedObject = this.pickedObjects[0].object;

                for(i = 0; i < this.tablero.boxesArray.length; i++){
                    if (this.tablero.boxesArray[i].getPosition().x == this.selectedObject.position.x && this.tablero.boxesArray[i].getPosition().y == this.selectedObject.position.y &&
                        this.tablero.boxesArray[i].getPosition().z == this.selectedObject.position.z) {
                        this.foundBox = this.tablero.boxesArray[i];  //Hemos encontrado la caja

                        if( MyScene.HORIZONTAL ){
                            this.tablero.overX(this.foundBox.fila, this.foundBox.columna,MyScene.NEW_SHIP);
                            this.tablero.resetOverX(this.foundBox.fila, this.foundBox.columna,MyScene.NEW_SHIP);
                        }
                        else{
                            this.tablero.overY(this.foundBox.fila, this.foundBox.columna,MyScene.NEW_SHIP);
                            this.tablero.resetOverY(this.foundBox.fila, this.foundBox.columna,MyScene.NEW_SHIP);
                        }

                    }
                }
            }
        }
    }

    onMouseWheel (event) {
        if (event.ctrlKey) {
            // The Trackballcontrol only works if Ctrl key is pressed
            this.getCameraControls().enabled = true;
        } else {
            this.getCameraControls().enabled = false;
        }
    }

    onKeyDown (event) {
        var x = event.which || event.keyCode;
        switch (x) {
            case 17 : // Ctrl key
                this.getCameraControls().enabled = true;
                break;
            case 9 : // Tab key
                if(MyScene.HORIZONTAL == 0){
                    MyScene.HORIZONTAL=1;
                }
                else{
                    MyScene.HORIZONTAL=0;
                }

                break;
        }
        //console.log( "hola1" );
    }

    onKeyUp (event) {
        var x = event.which || event.keyCode;
        switch (x) {
            case 17 : // Ctrl key
                this.getCameraControls().enabled = false;
                break;
        }
    }
}

// Application modes
MyScene.NO_ACTION = 0;
MyScene.NEW_SHIP = 0;
MyScene.HORIZONTAL = 1;

/// La función   main
$(function () {

    // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
    var scene = new MyScene("#WebGL-output");

    // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
    window.addEventListener("resize", () => scene.onWindowResize());
    window.addEventListener ("mousedown", (event) => scene.onMouseDown(event), true);
    window.addEventListener ("mouseup", (event) => scene.onMouseUp(event), true);
    window.addEventListener ("mousewheel", (event) => scene.onMouseWheel(event), true);   // For Chrome an others
    window.addEventListener ("mousemove", (event) => scene.onMouseMove(event), true);
    window.addEventListener ("keydown", (event) => scene.onKeyDown (event), true);
    window.addEventListener ("keyup", (event) => scene.onKeyUp(event), true);
    // Que no se nos olvide, la primera visualización.
    scene.update();
});

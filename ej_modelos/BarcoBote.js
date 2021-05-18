
import * as THREE from '../libs/three.module.js'

//Imports para los modelos
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import {GLTFLoader} from '../libs/GLTFLoader.js'

//Imports para la animacion
import * as TWEEN from '../libs/tween.esm.js'
import {Object3D} from "../libs/three.module.js";

class BarcoBote extends THREE.Object3D {
    constructor() {
        super();

        var that = this;

        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        var nodo = new Object3D();
        var modelo;
        materialLoader.load( '../models/barco_bote/materiales.mtl',
            function (materials){
                objectLoader.setMaterials(materials);
                objectLoader.load( '../models/barco_bote/modelo.obj',
                    function(object){
                        modelo = object;
                        nodo.add(modelo);
                    },
                    null,
                    null
                );
            },null,null
        );

        //Posicionar
        nodo.scale.set(0.24,0.3,0.3);
        nodo.position.x+=0.05;
        nodo.position.y+=0.5;

        this.add(nodo);

    }

    update() {

    }

}

export { BarcoBote }

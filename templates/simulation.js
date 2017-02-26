var scene;
var camera;
var cube;
var sphere;
var renderer;
var objects = [];
var controls;
var conbineGeo = new THREE.Geometry();
var combineMesh;
var mouse = new THREE.Vector2(), INTERSECTED;
var raycaster;
var precolor;

init();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//scene.add( cube );
//scene.add( sphere );
//scene.add( conbineMesh );
//combineMesh.setColor(0x00ddaa);
camera.position.z = 5;
renderer.setClearColor( 0xffffff );
var stats = new Stats();
container.appendChild( stats.dom );
render();
window.addEventListener('resize' , onWindowResize , false);


function init(){
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
//camera.position.z = 1000;


 renderer = new THREE.WebGLRenderer();
 var geometry = new THREE.BoxGeometry( 1, 1, 1 );
 var material = new THREE.MeshBasicMaterial( { color: 0x00ddaa } );

 // add the control
 controls = new THREE.TrackballControls( camera );
 controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
scene.add( new THREE.AmbientLight( 0x555555 ) );
var pointLight = new THREE.PointLight(0XFFFFFF);

 pointLight.position.x = 10;
 pointLight.position.y = 50;
 pointLight.position.z = 150;

 scene.add( pointLight );

//var geo = new THREE.SphereGeometry(1, 1, 1);

//circle = new THREE.Mesh( geo, material);
var radius = 1, segemnt = 10, rings = 10;

 var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
 var material = new THREE.MeshBasicMaterial({ color: 0x0030ff, opacity: 0.5, transparent: true} );



 var matrix = new THREE.Matrix4();
// sphere = new THREE.Mesh(
 //   		new THREE.SphereGeometry(radius,segemnt,rings),
 //  			 defaultMaterial
 //   	);

 var sphereGeo = new THREE.SphereGeometry(radius,segemnt,rings);



 for (let i = 0; i < 1999 ; i++){

   var object = new THREE.Mesh( sphereGeo,  new THREE.MeshBasicMaterial({ color: 0x0030ff, opacity: 0.5, transparent: true} ) )


   var position = new THREE.Vector3();
   position.x = Math.random() * 100 - 50;
   position.y = Math.random() * 60 - 30;
   position.z = Math.random() * 80 - 40;

 object.position.set( position.x, position.y, position.z );
 scene.add(object);
 //matrix.setPosition( position.x, position.y, positon.y);
 //conbineGeo.merge(sphereGeo, matrix);

 }

 //conbineMesh = new THREE.Mesh(conbineGeo, material);

 cube = new THREE.Mesh( geometry, material );
 raycaster = new THREE.Raycaster();
 document.addEventListener( 'mousemove', onDocumentMouseMove, false );

}
function onDocumentMouseMove(){
 event.preventDefault();

mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}



function render() {
 requestAnimationFrame( render );
 controls.update();
 raycaster.setFromCamera( mouse, camera );


var intersects = raycaster.intersectObjects( scene.children );

if ( intersects.length > 0 ) {

 if ( INTERSECTED != intersects[ 0 ].object ) {
   console.log("manage to find!");

   if ( INTERSECTED ){
     INTERSECTED.material.color.set( precolor  );
     console("inner test")
   }

   INTERSECTED = intersects[ 0 ].object;
   precolor = INTERSECTED.material.color.getHex();
   console.log("first.  ");
   INTERSECTED.material.color.set( 0xff0000 );
   console.log("second. ");
 }

} else {

 if ( INTERSECTED ) INTERSECTED.material.color.set( precolor );

 INTERSECTED = null;

}
stats.update();
 renderer.render( scene, camera );
}

function onWindowResize() {
 console.log('window resized');
 console.log('width: ', window.innerWidth);
 console.log('height: ', window.innerHeight);
 camera.aspect = window.innerWidth / window.innerHeight;
 renderer.setSize( window.innerWidth, window.innerHeight );
}

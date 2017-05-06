
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
var theaxis;

var curTxt=document.createElement('div');
document.body.appendChild(curTxt);



$.getJSON('/static/data.json',function(data){

   init();
   renderer.setSize( window.innerWidth, window.innerHeight );
   document.getElementById("container").appendChild( renderer.domElement );
   //scene.add( cube );
   //scene.add( sphere );
   //scene.add( conbineMesh );
   //combineMesh.setColor(0x00ddaa);
   camera.position.z = 5;
   renderer.setClearColor( 0xffffff );
  var stats = new Stats();
  container.appendChild( stats.dom );
  //  var newbutton = document.createElement('div');
  //  document.body.appendChild(newbutton);
  // newbutton.innerHTML="sdkusdhgfkusbfkusbfsbfdsbf,sdbfsfjksbfhlaijl";



   render();
   window.addEventListener('resize' , onWindowResize , false);

   console.log(document.getElementById("container").offsetWidth);


   function init(){


   scene = new THREE.Scene();
   camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
   //camera.position.z = 1000;
   var axes = new THREE.AxisHelper(1);
   scene.add(axes);


    renderer = new THREE.WebGLRenderer();
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ddaa } );

    // add the control
   controls = new THREE.TrackballControls( camera );
   controls.rotateSpeed = 1.5;
   controls.zoomSpeed = 1.2;
   controls.panSpeed = 0.8;
   controls.noZoom = false;
   controls.noPan = false;

   controls.minDistance = 0.1;

   controls.staticMoving = true;
   controls.dynamicDampingFactor = 0.3;
   scene.add( new THREE.AmbientLight( 0x555555 ) );
   var pointLight = new THREE.PointLight(0XFFFFFF);

    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 150;

    // controls.enabled = false;


    scene.add( pointLight );

   //var geo = new THREE.SphereGeometry(1, 1, 1);

   //circle = new THREE.Mesh( geo, material);
   var radius = 0.04, segemnt = 10, rings = 10;

    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
    var material = new THREE.MeshBasicMaterial({ color: 0x0030ff, opacity: 0.5, transparent: true} );



    var matrix = new THREE.Matrix4();
   // sphere = new THREE.Mesh(
    //         new THREE.SphereGeometry(radius,segemnt,rings),
    //          defaultMaterial
    //      );

    var sphereGeo = new THREE.SphereGeometry(radius,segemnt,rings);
    let xbar=0;
    let ybar=0;
    let zbar=0;

    for (let i = 0; i < 1000; i++){
      xbar+=data[i].x;
      ybar+=data[i].y;
      zbar+=data[i].z;
    }
    xbar/=1000; 
    ybar/=1000;
    zbar/=1000;
    

    for (let i = 0; i < 1000 ; i++){
      var object;
      if (i == 193 || i == 180){
        object = new THREE.Mesh( sphereGeo,  new THREE.MeshBasicMaterial({ color: 0xff0030, opacity: 0.5, transparent: true} ) )
      }
      else{
        object = new THREE.Mesh( sphereGeo,  new THREE.MeshBasicMaterial({ color: 0x0030ff, opacity: 0.5, transparent: true} ) )
      }


      

      var position = new THREE.Vector3();

      position.x = (data[i].x-xbar)/2    //Math.random() * 10 - 5;
      position.y = (data[i].y-ybar)/2   //Math.random() * 6 - 3;
      position.z = (data[i].z-zbar)/2    //Math.random() * 8 - 4;

      object.position.set( position.x, position.y, position.z );
      


      object.num = i;
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
    //curTxt.innerHTML="";

    document.body.onmousemove=moveCursor;
    curTxt.id="cursorText";
    
    var curTxtLen=[curTxt.offsetWidth,curTxt.offsetHeight];
    function moveCursor(e){
        if(!e){e=window.event;}
        curTxt.style.left=e.clientX-curTxtLen[0]+'px';
        curTxt.style.top=e.clientY-curTxtLen[1]+'px';
    }


   var intersects = raycaster.intersectObjects( scene.children );

   if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].object ) {

      if ( INTERSECTED ){
        curTxt.innerHTML=""
        INTERSECTED.material.color.set( precolor  );
      }
      INTERSECTED = intersects[ 0 ].object;
      precolor = INTERSECTED.material.color.getHex();
      INTERSECTED.material.color.set( 0xff0000 );
      if (intersects[ 0 ].object.hasOwnProperty("num")   ){
        curTxt.innerHTML=data[ intersects[ 0 ].object.num ].label;
      }
    }

   } else {

    if ( INTERSECTED ){
      INTERSECTED.material.color.set( precolor );
      curTxt.innerHTML=""
    }
    
    INTERSECTED = null;

   }
   stats.update();
    renderer.render( scene, camera );
   }


   function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize( window.innerWidth, window.innerHeight );
   }

   

})

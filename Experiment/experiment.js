/* **** To Do ********
 * 1. Add an analog clock with golden colour [done],
 * 2. Add glossiness [done],
 * 3. Add quiz with showing hints capability,
 * 4. Add world clock
 * 
 */
function addLights(){


	var spotLight	= new THREE.SpotLight( 0x222221 );
		spotLight.target.position.set( 1, -1, -20);
		spotLight.intensity = 10;
		spotLight.shadowCameraNear	= 0.1;		
		spotLight.castShadow		= true;
		spotLight.shadowDarkness	= 0.9;
		spotLight.shadowCameraVisible	= true;
		spotLight.position.set( 0, -800, 1000 );
		spotLight.shadowCameraVisible = false;
	
		scene.add ( spotLight );
	
		var spotLight2	= new THREE.SpotLight( 0x333332 );
		spotLight2.target.position.set( 1, -1, -20);
		spotLight2.intensity = 10;
		spotLight2.shadowCameraNear	= 0.1;		
		spotLight2.castShadow		= true;
		spotLight2.shadowDarkness	= 0.6;
		spotLight2.shadowCameraVisible	= true;
		spotLight2.position.set( 0, 800, 1000 );
		spotLight2.shadowCameraVisible = false;
	
		scene.add ( spotLight2 );
		
	
	}
	
var settingsDefault = {

	cameraAngle: 45,
	cameraDistanceNear: 10,
	cameraDistanceFar: 10000,
	cameraX: 0,
	cameraY: 0,
	cameraZ: 650,
	cameraLookX: 0,
	cameraLookY: 0,
	cameraLookZ: 0,

	lightX: 80,
	lightY: 80,
	lightZ: 80,

	lightShadowCameraSideWidth: 512,
	lightShadowCameraDistanceFar: 400,
	lightShadowDarkness: 0.4,
	lightShadowBias:.0001,
	lightShadowCameraVisible: false,

	minutesNumber: 60,
	radius: 100,
	radiusSmall: 3,
	radiusSmallest: 2,
	depthWrapper: 10,
	depthFace: 16,
	bigRadius: 110,
	lineLengthShortest: 10,
	lineLengthShort: 20,
	lineWidthShortest: 1,
	lineWidthShort: 5,
	lineWidthHandHour: 5,
	lineWidthHandMinute: 5,
	lineWidthHandSecond: 1,
	spacing: 5,
	spacingHand: 15,
	handHourLength: 1,
	handMinuteLength: 1,
	handSecondLength: 1,

	floorShown: true,
	floorSideWidth: 1000,
	floorZ: -11,

	colorFloor: 0x000000,
	colorClock: 0xffffff,
	colorClockWrapper: 0x323232,
	lineColor: 0x000000,
	lineShortColor: 0x000000,
	handHourColor: 0x000000,
	handHourColor: 0x000000,
	handMinuteColor: 0x000000,
	handSecondColor: 0xFF0000,
	handSecondCircleColor: 0xFF0000,

	spindleColor: 0xFFFFFF

	};

var settings = {};
	
settingsDefault.handHourLength = settingsDefault.radius - 40;
settingsDefault.handMinuteLength = settingsDefault.radius - 20;
settingsDefault.handSecondLength = settingsDefault.radius - 10;

for (var prop in settingsDefault) {

	if (settingsDefault.hasOwnProperty(prop)) {

		settings[prop] = settingsDefault[prop];

	}

}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	settings.cameraAngle,
	window.innerWidth / window.innerHeight,
	settings.cameraDistanceNear,
	settings.cameraDistanceFar
);
camera.position.x = settings.cameraX;
camera.position.y = settings.cameraY;
camera.position.z = settings.cameraZ;

camera.lookAt({
	x: settings.cameraLookX,
	y: settings.cameraLookY,
	z: settings.cameraLookZ
});

var renderer = new THREE.WebGLRenderer();

	//Add responsiveness
renderer.setSize( window.innerWidth, window.innerHeight );

renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;

document.body.appendChild( renderer.domElement );

var group = new THREE.Group();
group.position.y = 50;

scene.add( group );

var ambientLight = new THREE.AmbientLight( "white", 0.5 );
//scene.add( ambientLight );


var lightAmbient;
lightAmbient = new THREE.AmbientLight(0xFFFFFF, 0.2);
scene.add(lightAmbient);

var light;
light = new THREE.DirectionalLight(0xFFFFFF, 1.5);
light.position.set(
	//-335, 0, 2
	settings.lightX,
	settings.lightY,
	settings.lightZ
);

light.castShadow = true;

light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;

light.shadow.camera.left = -settings.lightShadowCameraSideWidth;
light.shadow.camera.right = settings.lightShadowCameraSideWidth;
light.shadow.camera.top = settings.lightShadowCameraSideWidth;
light.shadow.camera.bottom = -settings.lightShadowCameraSideWidth;

light.shadow.camera.far = settings.lightShadowCameraDistanceFar;
light.shadow.bias = settings.lightShadowBias;

scene.add(light);

var path = "textures/SwedishRoyalCastle/";
var format = '.jpg';
var urls = [
		path + 'px' + format, path + 'nx' + format,
		path + 'py' + format, path + 'ny' + format,
		path + 'pz' + format, path + 'nz' + format
	];

// var reflectionCube = new THREE.CubeTextureLoader().load( urls );
// reflectionCube.format = THREE.RGBFormat;

textureCube = new THREE.CubeTextureLoader().load( urls );
textureCube.format = THREE.RGBFormat;
textureCube.mapping = THREE.CubeReflectionMapping;

var cubeShader = THREE.ShaderLib[ "cube" ];
var cubeMaterial = new THREE.ShaderMaterial( {
	fragmentShader: cubeShader.fragmentShader,
	vertexShader: cubeShader.vertexShader,
	uniforms: cubeShader.uniforms,
	depthWrite: false,
	side: THREE.BackSide
} );
cubeMaterial.uniforms[ "tCube" ].value = textureCube;

//cubeMesh = new THREE.Mesh( new THREE.BoxBufferGeometry( 1000, 1000, 1000 ), cubeMaterial );
//scene.add( cubeMesh );

var materials = {

	floor: new THREE.MeshPhongMaterial({
		
			color      :  new THREE.Color("rgb(50,50,30)"),
			emissive   :  new THREE.Color("rgb(7,3,5)"),
			specular   :  new THREE.Color("rgb(19,10,4)"),
			specularMap    :  new THREE.TextureLoader().load("obj/wood1.jpg", {}, function(){}),
			shininess  :  100,
			bumpMap    :  new THREE.TextureLoader().load("obj/wood1.jpg", {}, function(){}),
			map        :  new THREE.TextureLoader().load("obj/wood1.jpg", {}, function(){}),
			bumpScale  :  2.5,
			shininess  :  10,
			//shading: THREE.FlatShading,
			side: THREE.DoubleSide
		}
	),
	clockWrapper: new THREE.MeshPhongMaterial(
		{
			color: settings.colorClockWrapper,
			shininess: 100,
			shading: THREE.FlatShading,
			side: THREE.DoubleSide,
			alphaMap : new THREE.TextureLoader().load("obj/scratched_glass.jpg"),
			bumpMap  : new THREE.TextureLoader().load("obj/scratched_glass.jpg"),
		}
	),
	// clock: new THREE.MeshPhongMaterial(
	// 	{
	// 		color: settings.colorClock,
	// 		shininess: 10,
	// 		shading: THREE.FlatShading,
	// 		//map: new THREE.TextureLoader().load("textures/dial12.jpg")
	// 	}
	// ),
	glass: new THREE.MeshPhongMaterial(
		{

			color: settings.colorClock,
			shininess: 10,
			shading: THREE.FlatShading, 
			map: new THREE.TextureLoader().load("textures/dial12.jpg"),
			side: THREE.DoubleSide,
			alphaMap : new THREE.TextureLoader().load("obj/scratched_glass.jpg", {}, function(){}),
			bumpMap    :  new THREE.TextureLoader().load("obj/scratched_glass.jpg", {}, function(){}),
			bumpScale  :  0.01,
			transparent: true,
			color: 0xaa8822, 
			envMap: textureCube, 
			combine: THREE.MixOperation, 
			reflectivity: 0.5,

		}
	),
	line: new THREE.MeshPhongMaterial(
		{
			color: settings.lineColor,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	lineShort: new THREE.MeshPhongMaterial(
		{
			color: settings.lineShortColor,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	handHour: new THREE.MeshPhongMaterial(
		{
			color: settings.handHourColor,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	handMinute: new THREE.MeshPhongMaterial(
		{
			color: settings.handMinuteColor,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	handSecond: new THREE.MeshPhongMaterial(
		{
			color: settings.handSecondColor,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	handSecondCircle: new THREE.MeshPhongMaterial(
		{
			color: settings.handSecondCircleColor,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	spindle: new THREE.MeshPhongMaterial(
		{
			color: settings.spindleColor,
			shininess: 10,
			shading: THREE.FlatShading
		}
	),
	read: new THREE.MeshPhongMaterial(
		{
			color      :  new THREE.Color("rgb(50,50,50)"),
			emissive   :  new THREE.Color("rgb(7,3,5)"),
			specular   :  new THREE.Color("rgb(20,20,20)"),
			shininess  :  20,
			map        :  new THREE.TextureLoader().load("obj/read_old.jpg", {}, function(){}),
			bumpMap    :  new THREE.TextureLoader().load("obj/read.png"),
			bumpScale  :  1
		}
	)
};

// Floor

var oldWall = [];
var wallWidth = 1000;
var nWalls = 4;

for(var i = 0; i < nWalls; i++){
	for(var j = 0; j < nWalls; j++){
		oldWall[i] = new THREE.Mesh( new THREE.PlaneBufferGeometry(wallWidth,wallWidth,1,1), materials.floor );
		oldWall[i].castShadow = false;
		oldWall[i].receiveShadow = true;
		oldWall[i].position.x = -wallWidth + (i-1)*wallWidth;
		oldWall[i].position.y = -wallWidth + (j-1)*wallWidth;
		oldWall[i].translateZ(settings.floorZ);
		group.add( oldWall[i] );
	}
}

var clockWrapperGeometry = new THREE.TorusBufferGeometry(settings.bigRadius, 8, 10, 128);
var clockWrapper = new THREE.Mesh( clockWrapperGeometry, materials.clockWrapper );
clockWrapper.castShadow = true;
group.add( clockWrapper );

var clockGeometry = new THREE.CylinderBufferGeometry(settings.radius, settings.radius, settings.depthFace, 360);
var clock = new THREE.Mesh( clockGeometry, materials.glass );
clock.translateZ(0);
clock.rotateX(Math.PI / 2);
clock.castShadow = true;
clock.receiveShadow = true;
group.add( clock );

var glassGeometry = new THREE.ConeBufferGeometry(settings.radius, 50, 100, 360);
var glassMesh = new THREE.Mesh(glassGeometry, materials.glass );
glassMesh.castShadow = false;
glassMesh.receiveShadow = true;
glassMesh.rotateX(Math.PI / 2);
//group.add( glassMesh );
glassMesh.position.set (0,0,25);


var shortLines = [];

for (var i = 0; i < settings.minutesNumber; i++) {
	var lineGeometry = null;
	var line = null;
	var lineParent = new THREE.Group();
	var lineAngle = (6 * Math.PI * i) / 180;

	lineParent.rotateZ(lineAngle);

	if(i % 5 === 0) {
		lineGeometry = new THREE.BoxBufferGeometry( settings.lineWidthShort, settings.lineLengthShort, 1);
		line = new THREE.Mesh( lineGeometry, materials.line );
		line.translateOnAxis(new THREE.Vector3( 0, 1, 0 ), settings.radius - settings.lineLengthShort / 2 - settings.spacing );
		line.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), settings.depthFace / 2 );
	} else {
		lineGeometry = new THREE.BoxBufferGeometry( settings.lineWidthShortest, settings.lineLengthShortest, 1);
		line = new THREE.Mesh( lineGeometry, materials.lineShort );
		line.translateOnAxis(new THREE.Vector3( 0, 1, 0 ), settings.radius - settings.lineLengthShortest / 2 - settings.spacing );
		line.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), settings.depthFace / 2 );
	}

	lineParent.add(line);

	line.castShadow = true;
	line.receiveShadow = true;

	shortLines.push(line);
	group.add( lineParent );

}

settings.spacing = settings.radius - settings.lineLengthShort / 2 - settings.spacing;

var boxGeometry3 = new THREE.BoxBufferGeometry( settings.lineWidthHandHour, settings.handHourLength, 1);
var boxGeometry4 = new THREE.BoxBufferGeometry( settings.lineWidthHandMinute, settings.handMinuteLength, 1);
var boxGeometry5 = new THREE.BoxBufferGeometry( settings.lineWidthHandSecond, settings.handSecondLength, 1);

var handHourParent = new THREE.Object3D();
var handMinuteParent = new THREE.Object3D();
var handSecondParent = new THREE.Object3D();

var handHour = new THREE.Mesh( boxGeometry3, materials.handHour );
handHour.castShadow = true;
handHour.receiveShadow = true;

var handMinute = new THREE.Mesh( boxGeometry4, materials.handMinute );
handMinute.castShadow = true;
handMinute.receiveShadow = true;

var handSecond = new THREE.Mesh( boxGeometry5, materials.handSecond );
handSecond.castShadow = true;
handSecond.receiveShadow = true;

handHourParent.add(handHour);
handMinuteParent.add(handMinute);
handSecondParent.add(handSecond);

handHour.translateOnAxis(new THREE.Vector3( 0, 1, 0 ), settings.handHourLength / 2 - settings.spacingHand );
handMinute.translateOnAxis(new THREE.Vector3( 0, 1, 0 ), settings.handMinuteLength / 2 - settings.spacingHand );
handSecond.translateOnAxis(new THREE.Vector3( 0, 1, 0 ), settings.handSecondLength / 2 - settings.spacingHand );

handHour.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), settings.depthFace / 2 + 2 );
handMinute.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), settings.depthFace / 2 + 3 );
handSecond.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), settings.depthFace / 2 + 4 );

group.add( handHourParent );
group.add( handMinuteParent );
group.add( handSecondParent );

var circleGeometry3 = new THREE.CircleBufferGeometry(settings.radiusSmall, 360 );
var circle3 = new THREE.Mesh( circleGeometry3, materials.handSecondCircle);
circle3.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), settings.depthFace / 2 + 5 );
group.add( circle3 );

var circleGeometry4 = new THREE.CircleBufferGeometry(settings.radiusSmallest, 360 );
var circle4 = new THREE.Mesh( circleGeometry4, materials.spindle);
circle4.translateOnAxis(new THREE.Vector3( 0, 0, 1 ), settings.depthFace / 2 + 5 );
group.add( circle4 );

var readGeometry = new THREE.BoxBufferGeometry(200, 320, 1, 256, 325);
var readMesh = new THREE.Mesh(readGeometry, materials.read);
readMesh.castShadow = true;
//readMesh.receiveShadow = true;
group.add( readMesh );
readMesh.position.set( -300, 5, -0.5 );
readMesh.rotation.z = - 0.05*Math.PI;

//GUI

var mouseX = 0;
var mouseXOnMouseDown = 0;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var timePassed = 0;

var canvas = document.getElementsByTagName('canvas')[0];

canvas.addEventListener( 'mousedown', onDocumentMouseDown, false );

function onDocumentMouseDown( event ) {

	event.preventDefault();
	canvas.addEventListener( 'mousemove', onDocumentMouseMove, false );
	canvas.addEventListener( 'mouseup', onDocumentMouseUp, false );
	canvas.addEventListener( 'mouseout', onDocumentMouseOut, false );
	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;

}
function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
}
function onDocumentMouseUp( event ) {
	canvas.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	canvas.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	canvas.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}
function onDocumentMouseOut( event ) {
	canvas.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	canvas.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	canvas.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

var timePassed = 0;
var date = new Date();

var hrs = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
var isP = false;

if (hrs>12){

	hrs = hrs - 12;
	isP = true;

}

var full = Math.PI*2;

var design = [];

//RingGeometry(innerRadius : Float, outerRadius : Float, thetaSegments : Integer, phiSegments : Integer, thetaStart : Float, thetaLength : Float)
var geometry = new THREE.RingBufferGeometry(40, 50, 128, null, Math.Pi*0.5, Math.PI*2);
var material = new THREE.MeshPhongMaterial({color: 'blue'});
var sec = new THREE.Mesh(geometry, material);
group.add(sec);
design.push(sec);

var geometry = new THREE.CircleBufferGeometry( 50, 128 );
var material = new THREE.MeshPhongMaterial( { 
	color: "#986239" ,
	shininess: 0.6,
	opacity: 0.5,
	map: new THREE.TextureLoader().load("textures/dial2.jpg"),
} );
var circle1 = new THREE.Mesh( geometry, material );
group.add( circle1 );

var geometry = new THREE.RingBufferGeometry(40, 50, 128, null, Math.Pi*0.5, Math.PI*2);
var material = new THREE.MeshPhongMaterial({color: 'blue'});
var min = new THREE.Mesh(geometry, material);
group.add(min);
design.push(min);

var geometry = new THREE.CircleBufferGeometry( 50, 128 );
var material = new THREE.MeshPhongMaterial( { 
	color: 0xffff00,
	map: new THREE.TextureLoader().load("textures/dial1.jpg")
} );
var circle2 = new THREE.Mesh( geometry, material );
group.add( circle2 );

var geometry = new THREE.RingBufferGeometry(40, 50, 128, null, Math.Pi*0.5, Math.PI*2);
var material = new THREE.MeshPhongMaterial({color: 'blue'});
var hrs = new THREE.Mesh(geometry, material);
group.add(hrs);
design.push(hrs);

var geometry = new THREE.CircleBufferGeometry( 50, 128 );
var material = new THREE.MeshPhongMaterial( { 
	color: 0xffff00, 
	map: new THREE.TextureLoader().load("textures/dial1.jpg"),
	//alphaMap: new THREE.TextureLoader().load("textures/water-displacement.jpg"),
} );
var circle3 = new THREE.Mesh( geometry, material );
group.add( circle3 );

var geometry = new THREE.BoxBufferGeometry(420, 120, 7);
var material = new THREE.MeshPhongMaterial( {
	//color: "white", 
	map: new THREE.TextureLoader().load("textures/metal.jpg"),
	bumpMap: new THREE.TextureLoader().load("textures/metal.jpg"),
	side: THREE.DoubleSide,
	shininess: 5,
	bumpScale: 5
} );
var plane1 = new THREE.Mesh( geometry, material );
group.add( plane1 );
design.push( plane1 );

var geometry = new THREE.BoxBufferGeometry(420, 6, 7);
var material = new THREE.MeshPhongMaterial( {
	color: "#000080", 
	side: THREE.DoubleSide
} );
var plane2 = new THREE.Mesh( geometry, material );
group.add( plane2 );
design.push( plane2 );


sec.position.set(150,-185,7);
circle1.position.set(150,-185,6.5);
min.position.set(0,-185,7);
circle2.position.set(0,-185,6.5);
hrs.position.set(-150,-185,7);
circle3.position.set(-150,-185,6.5);
plane1.position.set(0, -185, -1);
plane2.position.set(0, -248, -1);

//addLights();
var init_time = new Date().getTime() / 1000;
var zoom_time = 3;

var id;

//Foggy effect
var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
// scene.add(skyBox);
scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );


var hrText, minText, secText;
var desText = [];

loader = new THREE.FontLoader();
loader.load("optimer.json", function(response){
	font = response;
	geometry = new THREE.TextGeometry("12", {
		font : font,
		size : 20,
		height : 20,
	});

	hrText=new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:"black"}));
	hrText.translation = geometry.center();
	hrText.position.set(-150, -185, 0);
	group.add(hrText);
	hrText.scale.y=1.25;

	geometry = new THREE.TextGeometry("60", {
		font : font,
		size : 20,
		height : 20,
	});

	minText=new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:"black"}));
	minText.translation = geometry.center();
	group.add(minText);
	minText.castShadow=false;
	minText.position.set(0, -185, 0);
	minText.scale.y=1.25;

	geometry = new THREE.TextGeometry("60", {
		font : font,
		size : 20,
		height : 20,
	});

	secText=new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:"black"}));
	secText.translation = geometry.center();
	group.add(secText);
	secText.castShadow=false;
	secText.position.set(150, -185, 0);
	secText.scale.y=1.25;
});

var prevHr = 12, prevMin = 60, prevSec = 60;
function render_default(time) {

	time2 = new Date().getTime() / 1000 - init_time;
	//zooming effect during loading
	if(time2 < zoom_time){
		camera.position.z = 1500 - 900*Math.sin(time2*(Math.PI*0.5)/zoom_time);
	}
	id = requestAnimationFrame( render_default );

	
	var date = new Date();
	//console.log(date);

	var hrsA = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	var mili = date.getMilliseconds();
	var isP = false;

	if (hrsA>12)
	{
		hrs = hrsA - 12;
		isP = true;
	}
	else
		hrs = hrsA;

	var effSec = sec + mili/1000;
	var effMin = min + sec/60;
	var effHrs = hrs + min/60;

	//handles ring sliders
	design[0].geometry.dispose();
	var angSec = Math.PI*2*(effSec/60);
	geometry = new THREE.RingBufferGeometry(40, 50, 128, null, full/4, full - angSec);
	design[0].geometry = geometry;

	design[1].geometry.dispose();
	var angMin = Math.PI*2*(effMin/60);
	geometry = new THREE.RingBufferGeometry(40, 50, 128, null, full/4, full - angMin);
	design[1].geometry = geometry;

	design[2].geometry.dispose();
	var angHrs = Math.PI*2*(effHrs/12);
	geometry = new THREE.RingBufferGeometry(40, 50, 128, null, full/4, full - angHrs);
	design[2].geometry = geometry;

	design[4].geometry.dispose();

	if (isP){

		effHrs += 12;

	}
	var widHrs = (420/24)*effHrs;
	var geometry = new THREE.BoxGeometry(widHrs, 6, 7);
	var xTranslate = -(420 - widHrs)/2;
	design[4].geometry = geometry;
	design[4].position.set(xTranslate, -248,-1);
	
	//handles ticking of the second hand
	if (time - timePassed > 1000) {
		
		timePassed = time;
		var date = new Date();
		var handSecondR = (6 * sec * Math.PI) / 180;
		handSecondParent.rotation.z = -handSecondR;

	}

	//handles hour and minute hand
	handHourParent.rotation.z = full - angHrs;
	handMinuteParent.rotation.z = full - angMin;

	//desText[0].geometry.dispose();

	if (hrs!=prevHr){

		group.remove(hrText);

		if (hrs<10){

			geometry = new THREE.TextGeometry("0"+hrs, {
			font : font,
			size : 20,
			height : 20,
			});

		} else {

			geometry = new THREE.TextGeometry(hrs, {
			font : font,
			size : 20,
			height : 20,
			});
			

		}
		

		hrText=new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:"black"}));
		hrText.translation = geometry.center();
		hrText.position.set(-150, -185, 0);
		group.add(hrText);
		hrText.scale.y=1.25;

		prevHr = hrs;
		
	}

	if (min!=prevMin){

		group.remove(minText);
		if (min<10){

			geometry = new THREE.TextGeometry("0"+min, {
			font : font,
			size : 20,
			height : 20,
			});

		} else {

			geometry = new THREE.TextGeometry(min, {
			font : font,
			size : 20,
			height : 20,
		});

		}

	
		minText=new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:"black"}));
		minText.translation = geometry.center();
		group.add(minText);
		minText.castShadow=false;
		minText.position.set(0, -185, 0);
		minText.scale.y=1.25;
		prevMin = min;

		//console.log(min);
	}

	if (sec!=prevSec){

		group.remove(secText);
		if (sec<10){

			geometry = new THREE.TextGeometry("0"+sec, {
				font : font,
				size : 20,
				height : 20,
			});

		}
		else{

			geometry = new THREE.TextGeometry(sec, {
				font : font,
				size : 20,
				height : 20,
			});

		}
		
	
		secText=new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:"black"}));
		secText.translation = geometry.center();
		group.add(secText);
		secText.castShadow=false;
		secText.position.set(150, -185, 0);
		secText.scale.y=1.25;
	
		prevSec = sec;
	}
	

	group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
	renderer.render( scene, camera );
}

render_default();

function quiz()
{
	var hrs = Math.floor((Math.random() * 12) + 1);
	var min = Math.floor((Math.random() * 60) + 1);
	var sec = Math.floor((Math.random() * 100) + 1);
	render_static();
	function render_static(){

		requestAnimationFrame (render_static);
		group.remove(hrText);
		group.remove(minText);
		group.remove(secText);
		var mili = 0;
		var isP = false;

		if (hrs>12)
		{
			hrs = hrs - 12;
			isP = true;
		}

		var effSec = sec + mili/1000;
		var effMin = min + sec/60;
		var effHrs = hrs + min/60;

		design[0].geometry.dispose();
		var angSec = Math.PI*2*(effSec/60);
		geometry = new THREE.RingBufferGeometry(40, 50, 128, null, full/4, full - angSec);
		design[0].geometry = geometry;

		design[1].geometry.dispose();
		var angMin = Math.PI*2*(effMin/60);
		geometry = new THREE.RingBufferGeometry(40, 50, 128, null, full/4, full - angMin);
		design[1].geometry = geometry;

		design[2].geometry.dispose();
		var angHrs = Math.PI*2*(effHrs/12);
		geometry = new THREE.RingBufferGeometry(40, 50, 128, null, full/4, full - angHrs);
		design[2].geometry = geometry;

		design[4].geometry.dispose();
		if (isP){

			effHrs += 12;

		}
		var widHrs = (420/24)*effHrs;
		var geometry = new THREE.BoxGeometry(widHrs, 6, 7);
		var xTranslate = -(420 - widHrs)/2;
		//console.log(xTranslate);
		design[4].geometry = geometry;
		design[4].position.set(xTranslate, -248,-1);
		
		handHourParent.rotation.z = full - angHrs;
		handMinuteParent.rotation.z = full - angMin;
		handSecondParent.rotation.z = full - angSec;

		group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
		renderer.render( scene, camera );
	}
	
}

var helpContent;
function initialiseHelp(){

    helpContent="";
    helpContent = helpContent + "<h2>Reading Analog Clock Experiment Help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
	helpContent = helpContent + "<p>The experiment shows an analog clock of current time with a display below.</p>";
	helpContent = helpContent + "<p>Under the display plane there is a slider which denotes the amount of completion of day-time."
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
	PIEupdateHelp(helpContent);
	
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Analog Clock Reading Experiment Concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>This experiment shows an analog clock with a display under it.</p>";
    infoContent = infoContent + "<h3>Reading Analog Clock</h3>";
    infoContent = infoContent + "<p>To read an analog clock time --</p>";
    infoContent = infoContent + "<ol>";
    infoContent = infoContent + "<li>Identify the hand of shortest length. This is the hour hand. Check where it is pointing on the dial. This will be the hour time.</li>";
    infoContent = infoContent + "<li>Identify the hand of medium length. This is the minute hand. Check where it is pointing on the dial. Multiply this reading by 5. Now check where it is pointing on the smaller dial. Add this reading with product. This will be the minute time.</li>";
	infoContent = infoContent + "<li>Identify the hand of longest length. This is the second hand. Follow the same procedure as minute hand.</li>"
	infoContent = infoContent + "</ol>";
	infoContent = infoContent + "<p>Report the time in Hour: Minute: Second format</p>";
	infoContent = infoContent + "<h2>Happy Experimenting</h2>";
	PIEupdateInfo(infoContent);
	
}

function loadExperimentElements(){
	PIEsetExperimentTitle("Analog Clock Reading");
	PIEsetDeveloperName("Ayan Banerjee");

	/* initialise help and info content */
    initialiseHelp();
	initialiseInfo();
	PIEaddInputCommand("Quiz Mode", quiz);
}

function updateExperimentElements(t, dt){

}

function resetExperiment(){

	render_default();
	
}
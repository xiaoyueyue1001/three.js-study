const LINE_COLOR = 0x2283b8;
const CAMERA_ERROR_COLOR = 0xff0000;
const CAMERA_NORMAL_COLOR = 0x0eb9d0;
let width = document.querySelector('.show').clientWidth;
let height = document.querySelector('.show').clientHeight;
let scene,
    camera,cameraGroup,
    renderer,
    controls,
    stats,
    ambientLight,keyLight,keyLightSphere,
    axis;
let modeArray=[];//用于存放读取的外部模型
let cameraArray=[];//用于存放读取的外部模型
let ballArray=[];//用于存放读取的外部模型
let phase = 0

function init(){
    initSeenen();
    initCamera();
    initRenderer();
    initControls();
    // initStats();
    initInteraction();
    initLight();
    initAxis();
    loaderMode();
    animation()
    window.addEventListener( 'resize', onWindowResize, false );
}
function initSeenen(){
    scene = new THREE.Scene();
}
function initCamera(){
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100000);
    camera.position.set(0,1800,400);
    cameraGroup = new THREE.Group();
    cameraGroup.add(camera);

    scene.add(cameraGroup)
}
function initRenderer(){
    renderer = new THREE.WebGLRenderer({
        antialias:true,
        // precision: 'highp',
        // premultipliedAlpha:true
    });
    renderer.setClearColor(0x101c31);
    renderer.setSize(width, height);
    document.querySelector(".show").appendChild(renderer.domElement);
}
function initControls(){
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', ()=>{renderer.render(scene, camera);});
}
function initStats() {
    stats =  new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.querySelector(".show").appendChild(stats.domElement);
}
function initInteraction(){
    new THREE.Interaction(renderer,scene,camera);
}
function initLight(){
    ambientLight = new THREE.AmbientLight(0xffffff,0.5);
    scene.add(ambientLight);
    keyLight = new THREE.SpotLight(0xffffff);
    keyLight.position.set(3000, 1000, 5000);
    keyLight.target.position.set(0, 0, 0);
    keyLightSphere = new THREE.Mesh(new THREE.SphereGeometry(5,20,20),new THREE.MeshBasicMaterial({color:0x00ffff}));
    keyLightSphere.position.copy(keyLight.position);
    scene.add(keyLightSphere)
    scene.add(keyLight)
}
function initAxis(){
    axis = new THREE.AxesHelper(10000);
    // scene.add(axis)
}
function loaderMode() {
    let loader  = new THREE.OBJLoader2();
    loader.load('./mode/palace/palace/OBJ2/palace2.obj',obj=>{

        let group = obj.detail.loaderRootNode;
        group.traverse(child=>{
            if(child instanceof THREE.Mesh){
                let geometry = child.geometry;
                geometry.computeVertexNormals();
                let mode = new Mode({geometry,speed:0.05,color:LINE_COLOR});
                modeArray.push(mode);
            }
        });
        let loadGroup = new THREE.Group();
        modeArray.forEach(mode=>{
            loadGroup.add(mode.modeGroup)
        });

        addCamera({
            id:"001",
            cameraPosition:new THREE.Vector3(-500,77,900),
            ballPosition:new THREE.Vector3(-400,77,900),
            isNormal:true
        });
        addCamera({
            id:"002",
            cameraPosition:new THREE.Vector3(-500,77,700),
            ballPosition:new THREE.Vector3(-400,77,700),
            isNormal:true
        });
        addCamera({
            id:"003",
            cameraPosition:new THREE.Vector3(-100,77,800),
            isNormal:true
        });
        addCamera({
            id:"004",
            cameraPosition:new THREE.Vector3(100,77,800),
            isNormal:true
        });
        addCamera({
            id:"005",
            cameraPosition:new THREE.Vector3(-300,77,500),
            ballPosition:new THREE.Vector3(-400,77,500),
            isNormal:true
        });
        addCamera({
            id:"006",
            cameraPosition:new THREE.Vector3(0,77,500),
            ballPosition:new THREE.Vector3(-0,77,500),
            isNormal:true
        });
        addCamera({
            id:"007",
            cameraPosition:new THREE.Vector3(300,77,500),
            isNormal:true
        });
        addCamera({
            id:"008",
            cameraPosition:new THREE.Vector3(-300,77,300),
            isNormal:true
        });
        addCamera({
            id:"009",
            cameraPosition:new THREE.Vector3(0,77,300),
            isNormal:true
        });
        addCamera({
            id:"010",
            cameraPosition:new THREE.Vector3(300,77,300),
            isNormal:true
        });
        addCamera({
            id:"011",
            cameraPosition:new THREE.Vector3(-500,77,-250),
            ballPosition:new THREE.Vector3(-400,77,-200),
            isNormal:true
        });
        addCamera({
            id:"012",
            cameraPosition:new THREE.Vector3(0,77,-250),
            ballPosition:new THREE.Vector3(0,77,-200),
            isNormal:true
        });
        addCamera({
            id:"013",
            cameraPosition:new THREE.Vector3(500,77,-250),
            ballPosition:new THREE.Vector3(450,77,-200),
            isNormal:true
        });
        addCamera({
            id:"014",
            cameraPosition:new THREE.Vector3(-500,77,-550),
            ballPosition:new THREE.Vector3(-400,77,-600),
            isNormal:true
        });
        addCamera({
            id:"015",
            cameraPosition:new THREE.Vector3(0,77,-800),
            isNormal:true
        });
        addCamera({
            id:"016",
            cameraPosition:new THREE.Vector3(500,77,-550),
            ballPosition:new THREE.Vector3(450,77,-600),
            isNormal:true
        });
        loadGroup.position.set(0,0,0);
        scene.add(loadGroup)
    })
}
function animation() {
    // stats.update();
    requestAnimationFrame(animation);
    controls.update();
    renderer.render(scene, camera);
    update();
}
function update() {
    cameraGroup.rotateOnAxis(new THREE.Vector3(0,1,0).normalize(),0.005 );
    modeArray.forEach(mode=>{
        mode&&mode.update();
    });
    // cameraArray.forEach(mode=>{
    //     mode&&mode.update();
    // });

    phase +=0.05;
    // keyLight.position.z = +(1200 * (Math.sin(phase)));
    // keyLight.position.x = +(600 * (Math.cos(phase)));
    // keyLight.position.y = +(50 * (Math.cos(phase)))+500;
    // keyLightSphere.position.copy(keyLight.position);
}
function Mode({geometry,speed,isLight,color}) {
    this.speed = speed;
    this.modeGroup = new THREE.Group();

    let vertexShader = `
                attribute float phase;
                uniform float time;
                varying float vPhase;
                void main(){
                    vPhase = phase+time;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `;
    let fragmentShader = `
                uniform vec3 color;
                varying float vPhase;
                void main(){
                    float alpha = abs(sin(vPhase));
                    gl_FragColor = vec4(color,alpha );
                }
            `;
    this.uniforms = {
        time:{
            type:'float',
            value:0
        },
        color: {
            type:'float',
            value: new THREE.Color(color )
        }
    };
    let attributes = {
        phase:{
            type:'float',
            value:new Float32Array(geometry.attributes.position.count)
        }
    };
    let count = 0;
    attributes.phase.value=attributes.phase.value.map(v=>{
        count++;
        return (count%4)<2?Math.PI*0.5:0
    });
    let frameShader = new THREE.ShaderMaterial({
        vertexShader,fragmentShader,
        uniforms:this.uniforms,
        transparent:true,
        wireframe:true
    });
    geometry.addAttribute('phase',new THREE.BufferAttribute(attributes.phase.value,1))
    // let materials = [new THREE.MeshLambertMaterial({
    let materials = [new THREE.MeshPhongMaterial({
        color:LINE_COLOR,
        transparent:true,
        opacity:0.5,
        // side:THREE.DoubleSide
    }),frameShader];
    let mode = THREE.SceneUtils.createMultiMaterialObject(geometry,materials)

    this.update = function () {
        this.uniforms.time.value += this.speed;
    };
    this.modeGroup.add(mode);
}

function addCamera({id,cameraPosition,ballPosition,isNormal}) {
    let objLoader  = new THREE.OBJLoader();
    objLoader.load( './mode/camera/file.obj', function (group) {
        let groups = new THREE.Group();
        group.children.forEach(child=>{
            let geometry = child.geometry;
            // let mode = new Mode({geometry,speed:0.03,isLight:true,color:CAMERA_ERROR_COLOR});
            let mesh = new THREE.Mesh(geometry,new THREE.MeshPhongMaterial({
                color:isNormal?CAMERA_NORMAL_COLOR:CAMERA_ERROR_COLOR,
                wireframe: true
            }))
            groups.add(mesh);
        })

        groups.position.copy(cameraPosition);
        // groups.lookAt(camera.position)
        groups.scale.set(.7,.7,.7);
        groups.name = "camera"+id;
        cameraArray.push(groups);
        scene.add(groups);
        addMouseTipaAndClick(groups,function () {
            // mode.uniforms.color.value = new THREE.Color(CAMERA_ERROR_COLOR);
            $('#myModal').modal({

            })
        });
        if(ballPosition){
            let ball = new THREE.Mesh(new THREE.SphereGeometry(50,50,50),new THREE.MeshLambertMaterial({
                color:isNormal?CAMERA_NORMAL_COLOR:CAMERA_ERROR_COLOR,
                transparent:true,
                opacity:0.3,
                depthTest:false,
                // side:THREE.DoubleSide
            }));
            ball.position.copy(ballPosition);
            ball.name = "ball"+id;
            ballArray.push(ball);
            scene.add(ball);
        }
    } );
}
function addMouseTipaAndClick(group,fn) {
    group.on('click',e=>{
        fn();
    });
    group.on('mouseover',e=>{
        document.querySelector('.show').style.cursor = "pointer"
    });
    group.on('mouseout',e=>{
        document.querySelector('.show').style.cursor = "default"
    })
}
function onWindowResize() {
    let width = document.querySelector('.show').clientWidth;
    let height = document.querySelector('.show').clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

}

init();
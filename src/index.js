import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { create0DegPath, create180DegPath, create181To269DegPath, create1To89DegPath, create270DegPath, create271To359DegPath, create90DegPath, create91To179DegPath} from "./pathFunctions"

// setting this to true will enable orbit controls
let dev = true

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

if (dev){
    const orbit = new OrbitControls(camera, renderer.domElement)
}

// orbit.enablePan = false

// camera.position.set(0, 1, 3)
camera.position.set(0, 10, 60)

const gridHelper = new THREE.GridHelper(30, 30)
scene.add(gridHelper)
const axisHelper = new THREE.AxesHelper(10)
scene.add(axisHelper)

const ambientLight = new THREE.AmbientLight(0xFFFFFF)
scene.add(ambientLight)

// rainbow colors: red   orange    yellow    green      blue      indigo    voilet   https://www.krishnamani.in/color-codes-for-rainbow-vibgyor-colours/
let rainbowColors = [0xFF0000, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x0000FF, 0x4B0082, 0x9400D3]

const raceCarGeometry = new THREE.SphereGeometry(0.25)
const raceCarMaterial = new THREE.MeshBasicMaterial({color: 0x222222})
const raceCar = new THREE.Mesh(raceCarGeometry, raceCarMaterial)
scene.add(raceCar)
raceCar.position.set(0, 0.25, 2.5)
camera.lookAt(raceCar.position)

let xValue, yValue

window.addEventListener('mousemove', (e) => {
    xValue = e.clientX - window.innerWidth / 2
    yValue = e.clientY - window.innerHeight / 2
})

let forward = 0
let acceleration = 0.1
let deceleration = -1
let speedCap = 10
let steerSpeed = 0
let mouseDown = false
function steer(mouseX, carX, carY, carZ, acceleration) {
    steerSpeed = (Math.abs(mouseX) / (window.innerWidth / 2) * acceleration)
    if (Math.abs(mouseX) >= ((window.innerWidth / 2) - ((window.innerWidth / 2) * 0.7)) && acceleration != 0.1) {
        switch (Math.sign(mouseX)) {
            // steer left
            case -1:
                raceCar.position.set((carX + (0.01 * steerSpeed)), carY, carZ)
                camera.position.set(raceCar.position.x - (0.09 * steerSpeed), raceCar.position.y + 1, raceCar.position.z - 3)
                camera.lookAt(raceCar.position)
                break
            // steer right
            case 1:
                raceCar.position.set((carX - (0.01 * steerSpeed)), carY, carZ)
                camera.position.set(raceCar.position.x + (0.09 * steerSpeed), raceCar.position.y + 1, raceCar.position.z - 3)
                camera.lookAt(raceCar.position)
                break
            default:
                camera.position.set(carX, carY + 1, carZ - 3)
                break
        }
    }
    else {
        camera.position.set(carX, carY + 1, carZ - 3)
        camera.lookAt(raceCar.position)
    }
}

function createLeftTurn(count, angle, color, length, lastPlane, lastColor){
    let rotation, pMax, pMin, pY, pZ, o, x, y, z, colorIndex = 0, vertices

    if (lastPlane){
        pY = lastPlane.position.y
        pZ = lastPlane.position.z
        let lastBox = new THREE.Box3().setFromObject(lastPlane)
        pMax = lastBox.max
        pMin = lastBox.min
        colorIndex = color.indexOf(lastColor)
    }
    
    for (i = 0; i < count; i++){
        let angleRads = angle * Math.PI / 180
        let x1 = pMax.x + length * Math.cos(angleRads)
        let x2 = pMin.x + length * Math.cos(angleRads)
        if (i === 0){
            vertices = new Float32Array([
                pMin.x, pMax.y, pMax.z, // red
                x1, pMax.y, pMax.z + length, // yellow
                pMax.x, pMax.y, pMax.z, // blue
    
                x1, pMax.y, pMax.z + length,
                x2, pMax.y, pMax.z + length, // purple
                pMin.x, pMax.y, pMax.z,
            ])
        }
        else {
            vertices = new Float32Array([
                px2, pMax.y, pMax.z, // red
                x1, pMax.y, pMax.z + length, // yellow
                pMax.x, pMax.y, pMax.z, // blue
    
                x1, pMax.y, pMax.z + length,
                x2 - (pMax.x - x1), pMax.y, pMax.z + length, // purple
                px2, pMax.y, pMax.z,
            ])
            if (i === 1){
                const s1g = new THREE.SphereGeometry(.1)
                const s1m = new THREE.MeshBasicMaterial({color: 'red'})
                const s1 = new THREE.Mesh(s1g, s1m)
                scene.add(s1)
                s1.position.set(px2, pMax.y, pMax.z)

                const s2m = new THREE.MeshBasicMaterial({color: 'yellow'})
                const s2 = new THREE.Mesh(s1g, s2m)
                scene.add(s2)
                s2.position.set(x1, pMax.y, pMax.z + length)

                const s3m = new THREE.MeshBasicMaterial({color: 'blue'})
                const s3 = new THREE.Mesh(s1g, s3m)
                scene.add(s3)
                s3.position.set(pMax.x, pMax.y, pMax.z)

                const s4m = new THREE.MeshBasicMaterial({color: 'purple'})
                const s4 = new THREE.Mesh(s1g, s4m)
                scene.add(s4)
                s4.position.set(x2 + (x1 - pMax.x), pMax.y, pMax.z + length)
            }
        }
        

        const g = new THREE.BufferGeometry()
        const m = new THREE.MeshBasicMaterial({color: color[colorIndex], wireframe: true, side: THREE.DoubleSide})

        g.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ))
        o = new THREE.Mesh(g, m)
        scene.add(o)

        const box3 = new THREE.Box3().setFromObject(o)

        px1 =x1
        px2 = x2
        pMin = box3.min
        pMax = box3.max
        angle += (angle - 90)
    }
}


// rainbow road track
const p1 = create90DegPath(scene, 10, rainbowColors, 10, 3)
const t1 = createLeftTurn(3, 80, rainbowColors, 3, p1[0], p1[1])

function animate() {
    // rotateObject(anglePlane, 0.1, 30)
    if (!dev){
        if (mouseDown && !mouseIsDown[0]){
            deceleration = acceleration
            forward += 0.1 * acceleration
            acceleration = 0
            raceCar.position.set(raceCar.position.x, 0.25, forward)
            // camera.position.set(raceCar.position.x, raceCar.position.y+1, raceCar.position.z - 3)
            // camera.lookAt(raceCar.position) 
            acceleration += 0.1
            mouseDown = false
        }
        else if (!mouseDown && deceleration >= 0){
            forward += 0.1 * deceleration
            raceCar.position.set(raceCar.position.x, 0.25, forward)
            // camera.position.set(raceCar.position.x, raceCar.position.y+1, raceCar.position.z - 3)
            // camera.lookAt(raceCar.position) 
            deceleration -= 0.1
        }
        else if (mouseIsDown[0]){
            if (acceleration >= speedCap) {
                acceleration = speedCap
                forward += 0.1 * acceleration
            }
            else {
                forward += 0.1 * acceleration
            }
            deceleration = -1
            raceCar.position.set(raceCar.position.x, 0.25, forward)
            // camera.position.set(raceCar.position.x, raceCar.position.y+1, raceCar.position.z - 3)
            // camera.lookAt(raceCar.position) 
            acceleration += 0.1
            mouseDown = true
        }
        if (mouseIsDown[2]){
            forward -= 0.1
            raceCar.position.set(raceCar.position.x, 0.25, forward)
            camera.position.set(raceCar.position.x, raceCar.position.y+1, raceCar.position.z - 3)
            camera.lookAt(raceCar.position) 
        }
        // console.log(acceleration, deceleration)
        steer(xValue, raceCar.position.x, raceCar.position.y, forward, acceleration)
    }

    renderer.render(scene, camera)
}

let mouseIsDown = [0,0,0]
document.body.onmousedown = (e) => {
    ++mouseIsDown[e.button]
}
document.body.onmouseup = (e) => {
    --mouseIsDown[e.button]
}
document.getElementById('reset-button').onclick = () => {
    raceCar.position.set(0, 0.25, 0)
    forward = 0
    acceleration = 0 
    deceleration = 0
    steerSpeed = 0
    camera.position.set(raceCar.position.x, raceCar.position.y+1, raceCar.position.z - 3)
    camera.lookAt(raceCar.position)
}
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
renderer.setAnimationLoop(animate)
import * as THREE from "three"
import { ThreeMFLoader } from "three/examples/jsm/Addons.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { AsyncCompress } from "three/examples/jsm/libs/fflate.module.js"

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

// const orbit = new OrbitControls(camera, renderer.domElement)
// orbit.enablePan = false

const axesHelper = new THREE.AxesHelper(30)
scene.add(axesHelper)
const grid = new THREE.GridHelper(30,30)
scene.add(grid)
camera.position.set(0, 1, -3)
//orbit.update()

const ambientLight = new THREE.AmbientLight(0xFFFFFF)
scene.add(ambientLight)

// const rainbowRoadGeometry = new THREE.PlaneGeometry(3, 200, 10, 200)
// const rainbowRoadMaterial = new THREE.MeshBasicMaterial({
//     color: 0xFFFFFF,
//     wireframe: true})
// const rainbowRoad = new THREE.Mesh(rainbowRoadGeometry, rainbowRoadMaterial)
// scene.add(rainbowRoad)
// rainbowRoad.position.set(0, 0, 95)
// rainbowRoad.rotation.set((-0.5 * Math.PI), 0, 0)
// // adds same color to both sides of the plane
// rainbowRoadMaterial.side = THREE.DoubleSide

let segments = 200
// rainbow colors: red   orange    yellow    green      blue      indigo    voilet   https://www.krishnamani.in/color-codes-for-rainbow-vibgyor-colours/
let colors = [0xFF0000, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x0000FF, 0x4B0082, 0x9400D3]
let colorIndex = 0
let width = 6
let height = 3
let roadZ = 0

for(let i = 0; i < segments; i++){
    let roadGeometry = new THREE.PlaneGeometry(width, height)
    if (colorIndex === 6){
        colorIndex = 0
    }
    let roadMaterial = new THREE.MeshBasicMaterial({color: colors[colorIndex]})
    roadMaterial.transparent = true
    roadMaterial.opacity = 0.5
    let roadSegment = new THREE.Mesh(roadGeometry, roadMaterial)
    scene.add(roadSegment)
    roadMaterial.side = THREE.DoubleSide
    roadSegment.rotation.set((-0.5 * Math.PI), 0, 0)
    roadSegment.position.set(0, 0, roadZ)
    roadZ += 3
    colorIndex += 1
}


const raceCarGeometry = new THREE.SphereGeometry(0.25)
const raceCarMaterial = new THREE.MeshBasicMaterial({color: 0x222222})
const raceCar = new THREE.Mesh(raceCarGeometry, raceCarMaterial)
scene.add(raceCar)
raceCar.position.set(0, 0.25, 0)
camera.lookAt(raceCar.position)

let xValue, yValue

window.addEventListener('mousemove', (e) => {
    xValue = e.clientX - window.innerWidth / 2
    yValue = e.clientY - window.innerHeight / 2
})

function steer(mouseX, carX, carY, carZ, acceleration) {
    let steerSpeed = (Math.abs(mouseX) / (window.innerWidth / 2) * 6)
    console.log(steerSpeed)
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

let forward = 0
let acceleration = 0.1
let deceleration = -1
let speedCap = 4
let mouseDown = false

function animateRoad() {
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
        speed = 0
    }
    // console.log(acceleration, deceleration)
    steer(xValue, raceCar.position.x, raceCar.position.y, forward, acceleration)
    renderer.render(scene, camera)
}

let mouseIsDown = [0,0,0]
document.body.onmousedown = (e) => {
    ++mouseIsDown[e.button]
    console.log(mouseIsDown)
}
document.body.onmouseup = (e) => {
    --mouseIsDown[e.button]
    console.log(mouseIsDown)
}
document.getElementById('reset-button').onclick = () => {
    raceCar.position.set(0, 0.25, 0)
    forward = 0
    acceleration = 0 
    deceleration = 0
    camera.position.set(raceCar.position.x, raceCar.position.y+1, raceCar.position.z - 3)
    camera.lookAt(raceCar.position)
}
renderer.setAnimationLoop(animateRoad)
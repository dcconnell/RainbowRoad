import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

// setting this to true will enable orbit controls
let dev = false

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
camera.position.set(0, 15, 20)

const gridHelper = new THREE.GridHelper(30, 30)
scene.add(gridHelper)
const axisHelper = new THREE.AxesHelper(10)
scene.add(axisHelper)

const ambientLight = new THREE.AmbientLight(0xFFFFFF)
scene.add(ambientLight)

// rainbow colors: red   orange    yellow    green      blue      indigo    voilet   https://www.krishnamani.in/color-codes-for-rainbow-vibgyor-colours/
let rainbowColors = [0xFF0000, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x0000FF, 0x4B0082, 0x9400D3]
let colorIndex = 0

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

function planePath(count, angle, alignToMin, color, width, length, lastPlane, lastColor){
    let rotation, pMax, pMin, pY, pZ, o, x, y, z

    if (lastPlane){
        pY = lastPlane.position.y
        pZ = lastPlane.position.z
        let lastBox = new THREE.Box3().setFromObject(lastPlane)
        pMax = lastBox.max
        pMin = lastBox.min
        colorIndex = color.indexOf(lastColor)
    }

    for (let i = 0; i < count; i++) {

        if (typeof(angle) === Array){
            rotation = angle[i]
        }
        else{
            rotation = angle
        }

        if (colorIndex === color.length - 1){
            colorIndex = 0
        }

        let g = new THREE.PlaneGeometry(width, length, 1, 1)
        let m = new THREE.MeshBasicMaterial({color: color[colorIndex], wireframe: false, side: THREE.DoubleSide, transparent: true, opacity: 0.5})
        o = new THREE.Mesh(g, m)
        scene.add(o)
        o.rotation.set(THREE.MathUtils.degToRad(rotation), 0, 0)
        
        let box3 = new THREE.Box3().setFromObject(o)

        if (i === 1 && pY === 0){
            pY = 1
        }

        if ((i != 0 || lastPlane) && !alignToMin){
            if(rotation <= 90){
                x = o.position.x
                y = (pMax.y + (box3.max.y + box3.min.y) + (box3.max.y - o.position.y))
                z = (pMax.z + (o.position.z - box3.min.z))
    
                o.position.set(x, y, z)
            }
            else if (rotation > 90 && rotation <= 180){
                x = o.position.x
                y = (pMin.y - (box3.max.y + box3.min.y) - (box3.max.y - o.position.y))
                z = (pMax.z + (o.position.z - box3.min.z))
    
                o.position.set(x, y, z)
            }
            else if (rotation > 180 && rotation <= 270){
                x = o.position.x
                if (i === 0){
                    y = (pMax.y - (box3.max.y + box3.min.y) + (box3.max.y - o.position.y))
                    z = (pMax.z - (o.position.z - box3.min.z))
                }
                else{
                    y = (pMin.y - (box3.max.y + box3.min.y) - (box3.max.y - o.position.y))
                    z = (pMin.z - (o.position.z - box3.min.z))
                }
    
                o.position.set(x, y, z)
            }
            else{
                x = o.position.x
                y = (pMax.y + (box3.max.y + box3.min.y) + (box3.max.y - o.position.y))
                z = (pMin.z - (o.position.z - box3.min.z))
    
                o.position.set(x, y, z)
            }
        }
        if ((i != 0 || lastPlane) && alignToMin){
            if(rotation <= 90){
                x = o.position.x
                y = (pMin.y + (box3.max.y + box3.min.y) + (box3.max.y - o.position.y))
                z = (pMax.z + (o.position.z - box3.min.z))
    
                o.position.set(x, y, z)
            }
            else if (rotation > 90 && rotation <= 180){
                x = o.position.x
                y = (pMin.y - (box3.max.y + box3.min.y) - (box3.max.y - o.position.y))
                z = (pMax.z + (o.position.z - box3.min.z))
    
                o.position.set(x, y, z)
            }
            else if (rotation > 180 && rotation <= 270){
                x = o.position.x
                y = (pMin.y - (box3.max.y + box3.min.y) - (box3.max.y - o.position.y))
                z = (pMin.z - (o.position.z - box3.min.z))
    
                o.position.set(x, y, z)
            }
            else{
                x = o.position.x
                y = (pMax.y + (box3.max.y + box3.min.y) + (box3.max.y - o.position.y))
                z = (pMin.z - (o.position.z - box3.min.z))
    
                o.position.set(x, y, z)
            }
        }
        let box4 = new THREE.Box3().setFromObject(o)
        pMax = box4.max
        pMin = box4.min
        pY = o.position.y
        pZ = o.position.z
        colorIndex += 1
        // console.log(pY, angle, pMax.y, box3.max.y)
    }
    return [o, color[colorIndex]]
}

// rainbow road track
const p1 = planePath(20, 90, true, rainbowColors, 10, 3)
const p2 = planePath(2, 120, true, rainbowColors, 10, 3, p1[0], p1[1])
const p3 = planePath(4, 133, true, rainbowColors, 10, 3, p2[0], p2[1])
const p4 = planePath(10, 90, true, rainbowColors, 10, 3, p3[0], p3[1])
const p5 = planePath(3, 80, false, rainbowColors, 10, 3, p4[0], p4[1])
const p6 = planePath(4, 40, false, rainbowColors, 10, 3, p5[0], p5[1])
const p7 = planePath(500, 90, false, rainbowColors, 10, 3, p6[0], p6[1])


function animateRoad() {
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
renderer.setAnimationLoop(animateRoad)
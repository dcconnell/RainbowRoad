import * as THREE from "three"

export function create1To89DegPath(scene, count, angle, color, width, length, lastPlane, lastColor){
    let rotation, pMax, pMin, pY, pZ, o, x, y, z, colorIndex = 0

    console.assert(angle < 90, 'Function Angle Is Greater Than 89')

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

        if (i != 0 || lastPlane){
            x = o.position.x
            y = (pMax.y + (box3.max.y + box3.min.y) + (box3.max.y - o.position.y))
            z = (pMax.z + (o.position.z - box3.min.z))

            o.position.set(x, y, z)
        }

        let box4 = new THREE.Box3().setFromObject(o)
        pMax = box4.max
        pMin = box4.min
        pY = o.position.y
        pZ = o.position.z
        colorIndex += 1
    }
    return [o, color[colorIndex]]
}

export function create91To179DegPath(scene, count, angle, color, width, length, lastPlane, lastColor){
    let rotation, pMax, pMin, pY, pZ, o, x, y, z, colorIndex = 0

    console.assert(angle > 90 && angle < 180, 'Function Angle Is Not Between 91 && 179')

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

        if (i != 0 || lastPlane){
            x = o.position.x
            y = (pMin.y - (box3.max.y + box3.min.y) - (box3.max.y - o.position.y))
            z = (pMax.z + (o.position.z - box3.min.z))

            o.position.set(x, y, z)
        }

        let box4 = new THREE.Box3().setFromObject(o)
        pMax = box4.max
        pMin = box4.min
        pY = o.position.y
        pZ = o.position.z
        colorIndex += 1
    }
    return [o, color[colorIndex]]
}

export function create90DegPath(scene, count, color, width, length, lastPlane, lastColor){
    let rotation, pMax, pMin, pY, pZ, o, x, y, z, angle = 90, colorIndex = 0

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

        if (colorIndex > (color.length - 1)){
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

        if (i != 0 || lastPlane){
            x = o.position.x
            y = (pMin.y + (box3.max.y + box3.min.y) + (box3.max.y - o.position.y))
            z = (pMax.z + (o.position.z - box3.min.z))

            o.position.set(x, y, z)
        }

        let box4 = new THREE.Box3().setFromObject(o)
        pMax = box4.max
        pMin = box4.min
        pY = o.position.y
        pZ = o.position.z
        colorIndex += 1
    }
    return [o, color[colorIndex]]
}

export function create180DegPath(scene, count, color, width, length, lastPlane, lastColor){
    let rotation, pMax, pMin, pY, pZ, o, x, y, z, angle = 180, colorIndex = 0

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

        if (i != 0 || lastPlane){
            x = o.position.x
            y = (pMin.y - (box3.max.y + box3.min.y) - (box3.max.y - o.position.y))
            z = (pMax.z + (o.position.z - box3.min.z))

            o.position.set(x, y, z)
        }

        let box4 = new THREE.Box3().setFromObject(o)
        pMax = box4.max
        pMin = box4.min
        pY = o.position.y
        pZ = o.position.z
        colorIndex += 1
    }
    return [o, color[colorIndex]]
}

export function create181To269DegPath(scene, count, angle, color, width, length, lastPlane, lastColor){
    let rotation, pMax, pMin, pY, pZ, o, x, y, z, colorIndex = 0

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

        if (i != 0 || lastPlane){
            x = o.position.x
            y = (pMin.y - (box3.max.y + box3.min.y) - (box3.max.y - o.position.y))
            z = (pMin.z - (o.position.z - box3.min.z))

            o.position.set(x, y, z)
        }

        let box4 = new THREE.Box3().setFromObject(o)
        pMax = box4.max
        pMin = box4.min
        pY = o.position.y
        pZ = o.position.z
        colorIndex += 1
    }
    return [o, color[colorIndex]]
}

export function create270DegPath(scene, count, color, width, length, lastPlane, lastColor){
    let rotation, pMax, pMin, pY, pZ, o, x, y, z, angle = 270, colorIndex = 0

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

        if (i != 0 || lastPlane){
            x = o.position.x
            y = (pMin.y - (box3.max.y + box3.min.y) - (box3.max.y - o.position.y))
            z = (pMin.z - (o.position.z - box3.min.z))

            o.position.set(x, y, z)
        }

        let box4 = new THREE.Box3().setFromObject(o)
        pMax = box4.max
        pMin = box4.min
        pY = o.position.y
        pZ = o.position.z
        colorIndex += 1
    }
    return [o, color[colorIndex]]
}

export function create271To359DegPath(scene, count, angle, color, width, length, lastPlane, lastColor){
    let rotation, pMax, pMin, pY, pZ, o, x, y, z, colorIndex = 0

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

        if (i != 0 || lastPlane){
            x = o.position.x
            y = (pMax.y + (box3.max.y + box3.min.y) + (box3.max.y - o.position.y))
            z = (pMin.z - (o.position.z - box3.min.z))

            o.position.set(x, y, z)
        }

        let box4 = new THREE.Box3().setFromObject(o)
        pMax = box4.max
        pMin = box4.min
        pY = o.position.y
        pZ = o.position.z
        colorIndex += 1
    }
    return [o, color[colorIndex]]
}

export function create0DegPath(scene, count, color, width, length, lastPlane, lastColor){
    let rotation, pMax, pMin, pY, pZ, o, x, y, z, angle = 0, colorIndex = 0

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

        if (i != 0 || lastPlane){
            x = o.position.x
            y = (pMax.y + (box3.max.y + box3.min.y) + (box3.max.y - o.position.y))
            z = (pMin.z - (o.position.z - box3.min.z))

            o.position.set(x, y, z)
        }

        let box4 = new THREE.Box3().setFromObject(o)
        pMax = box4.max
        pMin = box4.min
        pY = o.position.y
        pZ = o.position.z
        colorIndex += 1
    }
    return [o, color[colorIndex]]
}

// mapData.js
import { cccBoundaries } from '../gameData/cccBoundaries.js';
import { doorCollision } from '../gameData/mainEntranceCollision.js';
import { groundFloorCollisions } from '../gameData/groundFloorCollisions.js';
import cccMap from "../gameAssets/cccfinal.png"
import groundFloor from "../gameAssets/Ground.png"

let cccEntryCollisionMap = [];
let cccEntryGateCollisionMap = [];
let cccGroundFloorCollisionMap = [];
let cccGroundFloorDoorCollisionMap = [];

for (let i = 0; i < cccBoundaries.length; i += 70) {
  cccEntryCollisionMap.push(cccBoundaries.slice(i, 70 + i));
}
for (let i = 0; i < doorCollision.length; i += 70) {
  cccEntryGateCollisionMap.push(doorCollision.slice(i, 70 + i));
}
for (let i = 0; i < groundFloorCollisions.length; i += 70) {
  cccGroundFloorCollisionMap.push(groundFloorCollisions.slice(i, 70 + i));
}
// for (let i = 0; i < cccGroundFloorDoorCollisionMap.length; i += 70) {
//   cccEntryGateCollisionMap.push(cccGroundFloorDoorCollisionMap.slice(i, 70 + i));
// }

class Boundary {
  static width = 12 * 3;
  static height = 12 * 3;

  constructor({ position }) {
    this.position = {
      x: position.x,
      y: position.y
    };
    this.width = Boundary.width;
    this.height = Boundary.height;
  }

  draw(ctx, bgX, bgY) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(this.position.x - bgX, this.position.y - bgY, this.width, this.height);
  }
}

const cccEntryCollision = [];
const cccEntryGateCollision = [];
const cccGroundFloorCollision = [];
const cccGroundFloorDoorCollision = [];

cccEntryCollisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2731) {
      cccEntryCollision.push(
        new Boundary({
          position: {
            x: j * Boundary.width ,
            y: i * Boundary.height 
          }
        })
      );
    }
  });
});


cccEntryGateCollisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 123) { 
      cccEntryGateCollision.push(
        new Boundary({
          position: {
            x: j * Boundary.width,
            y: i * Boundary.height
          }
        })
      );
    }
  });
});

// console.log("dnd",cccGroundFloorCollisionMap)
cccGroundFloorCollisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 14599) { 
      cccGroundFloorCollision.push(
        new Boundary({
          position: {
            x: j * Boundary.width,
            y: i * Boundary.height
          }
        })
      );
    }
  });
});

export const maps = {
  map1: {
    backgroundMap: cccMap,
    boundaries: cccEntryCollision,
    doorCollisions: cccEntryGateCollision,
    textTrigger:[ {
      trigger: true,
      message: "Well Well look who's here......",
      duration: 1500,
      hasShown: false
    },
    {
      trigger: true,
      message: "message 2.....",
      duration: 1500,
      hasShown: false
    }],
    spawnPoint: { x: 480, y: 450 }
  },
  map2: {
    backgroundMap: groundFloor,
    boundaries: cccGroundFloorCollision,
    doorCollisions: cccEntryGateCollision,
    textTrigger:{trigger:false},
    spawnPoint: { x: 480, y: 450 }
  },
};

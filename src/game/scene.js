// mapData.js
import { cccEntranceCollisionArray } from '../gameData/cccEntrance/cccEntranceMapCollisionBoundary.js';
import { cccEntranceGuideMapCollisionArray } from '../gameData/cccEntrance/guideMapCollisionBoundary.js';
import { cccEntryGateCollisionArray } from '../gameData/cccEntrance/cccEntranceGateCollisionBoundary.js';
// import { doorCollision } from '../gameData/mainEntranceCollision.js';
import { groundFloorCollisions } from '../gameData/groundFloorCollisions.js';
import cccMap from "../gameAssets/cccfinal.png"
import groundFloor from "../gameAssets/Ground.png"

let cccEntryCollisionMap = [];
let cccEntryGateCollisionMap = [];
let cccEntranceGuideMapCollisionMap = [];
let cccGroundFloorCollisionMap = [];
let cccGroundFloorDoorCollisionMap = [];

for (let i = 0; i < cccEntranceCollisionArray.length; i += 70) {
  cccEntryCollisionMap.push(cccEntranceCollisionArray.slice(i, 70 + i));
}
for (let i = 0; i < cccEntryGateCollisionArray.length; i += 70) {
  cccEntryGateCollisionMap.push(cccEntryGateCollisionArray.slice(i, 70 + i));
}
for (let i = 0; i < cccEntranceGuideMapCollisionArray.length; i += 70) {
  cccEntranceGuideMapCollisionMap.push(cccEntranceGuideMapCollisionArray.slice(i, 70 + i));
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
const cccEntryGuideMapCollision = [];
const cccGroundFloorCollision = [];
const cccGroundFloorDoorCollision = [];

cccEntryCollisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 3591) {
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
    if (symbol === 1234) { 
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
cccEntranceGuideMapCollisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1935) { 
      cccEntryGuideMapCollision.push(
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

console.log("hddj" ,cccEntryGuideMapCollision)

export const maps = {
  map1: {
    backgroundMap: cccMap,
    boundaries: cccEntryCollision,
    obstacleBoundary : cccEntryGuideMapCollision,
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
    transitioningFrom : "",
    transitioningTo : "map2",
    spawnPoint: { x: 50, y: 190 },
    mapPosition : {x:480 , y:450}
  },
  map2: {
    backgroundMap: groundFloor,
    boundaries: cccGroundFloorCollision,
    obstacleBoundary : [],
    doorCollisions: cccEntryGateCollision,
    transitioningFrom : "map1",
    transitioningTo : "map3",
    textTrigger:{trigger:false},
    spawnPoint: { x: 50, y: 190 },
    mapPosition : {x:480 , y:970}
  },
};

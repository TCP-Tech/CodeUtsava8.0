import { cccEntranceCollisionArray, cccEntranceGuideMapCollisionArray, cccEntryGateCollisionArray } from '../gameData/cccEntranceBoundaries/cccAllBoundary.js';
import { groundFloorCollisions, groundFloorTableBoundary, groundFloorGateBoundary, groundFloorLiftBoundary } from '../gameData/cccGroundFloorBoundaries/gfAllBoundary.js';
import { lift, firstFloorCollisions, interaction } from '../gameData/firstFloorBoundaries/firstFloorAllBoundaries.js';
import { firstFloorCorridorCollision,firstFloorCorridorExitCollision, firstFloorLabEntryDoorCollision } from '../gameData/firstFloorCorridorBoundaries/firstFloorCorridorAllBoundaries.js';
import {  firstFloorLabTable,firstFloorLabCollision, firstFloorLabExit } from '../gameData/firstFloorLabBoundaries/firstFloorLabAllBoundaries.js';
import { secondFloorBoundaries, secondFloorLift} from "../gameData/secondFloorEntranceBoundaries/secondFloor1AllBoundaries.js";
import {secondFloor2LeftGate, secondFloor2rightGate, secondFloor2Boundaries} from "../gameData/secondFloorGalleryBoundaries/secondFloor2AllBoundaries.js";
import {secondFloor3LeftGate, secondFloor3rightGate, secondFloor3Boundaries, pptHallInteraction} from "../gameData/secondFloorPPTHallBoundaries/secondFloor3AllBoundaries.js"
import { CYCLE_LOOP, FRAME_LIMIT, FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT, MOVEMENT_SPEED, SCALED_WIDTH, SCALED_HEIGHT, FADE_OUT_SPEED } from './constants.js';
import cccMap from "../gameAssets/FinalCCC.png";
import groundFloor from "../gameAssets/FinalGroundFloor.png";
import firstFloor from "../gameAssets/FirstFloorFinal.png";
import firstFloorCorridor from "../gameAssets/firstFloorCorridor.png";
import firstFloorLab from "../gameAssets/firstFloorLab.png";
import secondFloorEntrance from "../gameAssets/secondFloorEntrance.png";
import secondFloorGallery from "../gameAssets/secondFloorGallery.png";
import secondFloorPPTHall from "../gameAssets/secondFloorPPTHall.png"

async function fetchHTML(filePath) {
  const response = await fetch(filePath);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
  }
  return await response.text();
}

function generateBoundaries(boundary, key) {
  let collisionMatrix = [];
  for (let i = 0; i < boundary.length; i += 130) {
    collisionMatrix.push(boundary.slice(i, 130 + i));
  }

  const collisionMap = [];
  collisionMatrix.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === key) {
        collisionMap.push(
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

  return collisionMap;
}

class Boundary {
  static width = 12 * 2;
  static height = 12 * 2;

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

const collisionTextTriggers = {
  map1: [
    {
      obstacleType: 'guidePost',
      message: ["You've collided into the guide post.."],
      hasShown: false,
      async getElement() {
        return await fetchHTML('../../gameCollisionComponents/entrance/page.html');
      }
    }
  ],
  map2: [
    {
      obstacleType: 'reception',
      message: ["Welcome to Central Computer Center!", "Here are some FAQS about CodeUtsava"],
      hasShown: false,
      async getElement() {
        return await fetchHTML('../../gameCollisionComponents/groundFloor/page.html');
      }
    }
  ],
  map5: [
    {
      obstacleType: 'reception',
      message: ["Are you ready for intense coding challenges??"],
      hasShown: false,
      async getElement() {
        return "";
      }
    }
  ],
  map8: [
    {
      obstacleType: 'table',
      message: ["Here are the problem statements for codeutsava's 8th edition...."],
      hasShown: false,
      async getElement() {
        return "";
      }
    }
  ],
};

// Maps Configuration
export const maps = {
  liftCollision:[{
    async getElement() {
      return await fetchHTML('../../gameCollisionComponents/lift/page.html');
    }
  }],
  map1: {
    backgroundMap: cccMap,
    boundaries: generateBoundaries(cccEntranceCollisionArray, 3579),
    obstacleBoundary: generateBoundaries(cccEntranceGuideMapCollisionArray, 3579),
    doorCollisions: {
      leadsToPrev:{
        hasLift:false,
        boundary:[],
      },
      leadsToNext:{ 
        hasLift:false,
        boundary:generateBoundaries(cccEntryGateCollisionArray, 3579),
      },
      directionOnNextMap: FACING_UP,
      directionOnPrevMap: FACING_DOWN,
    },
    mapLoadTextTriggers: [
      {
        message: ["You've made it to the entrance of Central Computer Center!!"],
        hasShown: false,
      },
    ],
    collisionTextTriggers: collisionTextTriggers.map1,
    transitioningFrom: "",
    transitioningTo: "map2",
    mapPosition: {
      enterFromFrontPosition : {x:820,y:1050},
      enterFromLiftPosition : {x:780 , y:980}
      // nextMapsPosition: { x: 780, y: 1050 },
      // prevMapPosition: { x: 780, y: 980 }
    },
  },
  map2: {
    backgroundMap: groundFloor,
    boundaries: generateBoundaries(groundFloorCollisions, 14463),
    obstacleBoundary: generateBoundaries(groundFloorTableBoundary, 14463),
    doorCollisions: {
      leadsToPrev:{ 
        hasLift:false,
        boundary:generateBoundaries(groundFloorGateBoundary, 14463),
      },
      leadsToNext:{ 
        hasLift:true,
        boundary:generateBoundaries(groundFloorLiftBoundary, 14463),
      },
      directionOnNextMap: FACING_DOWN,
      directionOnPrevMap: FACING_DOWN,
    },
    mapLoadTextTriggers: [
      {
        trigger: true,
        message: ["You've reached ground floor"],
        hasShown: false,
      }
    ],
    collisionTextTriggers: collisionTextTriggers.map2,
    transitioningFrom: "map1",
    transitioningTo: "map3",
    mapPosition: { 
      enterFromFrontPosition : {x:780,y:1050},
      enterFromLiftPosition : {x:1180 , y:700}
      // nextMapsPosition: { x: 1380, y: 1050 },
      // prevMapPosition: { x: 780, y: 980 }
    },
  },
  map3: {
    backgroundMap: firstFloor,
    boundaries: generateBoundaries(firstFloorCollisions, 9497),
    obstacleBoundary: [],
    doorCollisions: {
      leadsToPrev:{ 
        hasLift: true,
        boundary:generateBoundaries(lift, 9497),
      },
      leadsToNext: {
        hasLift: false,
        boundary:generateBoundaries(interaction, 9497),
      },
      directionOnNextMap: FACING_LEFT,
      directionOnPrevMap: FACING_DOWN,
    },
    mapLoadTextTriggers: [
      {
        trigger: true,
        message: ["You've reached first floor"],
        hasShown: false,
      }
    ],
    collisionTextTriggers: [],
    transitioningFrom: "map2",
    transitioningTo: "map4",
    mapPosition: { 
      enterFromFrontPosition : {x:280,y:700},
      enterFromLiftPosition : {x:1420 , y:1110}
      // nextMapsPosition: { x: 1380, y: 1050 },
      // prevMapPosition: { x: 1180, y: 600 }
    },
  },
  map4: {
    backgroundMap: firstFloorCorridor,
    boundaries: generateBoundaries(firstFloorCorridorCollision, 62005),
    obstacleBoundary: [],
    doorCollisions: {
      leadsToPrev:{ 
        hasLift: false,
        boundary:generateBoundaries(firstFloorCorridorExitCollision, 62005),
      },
      leadsToNext: {
        hasLift: false,
        boundary:generateBoundaries(firstFloorLabEntryDoorCollision, 62005),
      },
      directionOnNextMap: FACING_DOWN,
      directionOnPrevMap: FACING_RIGHT,
    },
    mapLoadTextTriggers: [],
    collisionTextTriggers: [],
    transitioningFrom: "map3",
    transitioningTo: "map5",
    mapPosition: { 
      enterFromFrontPosition : {x:1380,y:400},
      enterFromLiftPosition : {x:950 , y:400}
      // nextMapsPosition: { x: 1380, y: 1050 },
      // prevMapPosition: { x: 1180, y: 600 }
    },
  },
  map5: {
    backgroundMap: firstFloorLab,
    boundaries: generateBoundaries(firstFloorLabCollision, 9044),
    obstacleBoundary: generateBoundaries(firstFloorLabTable, 9044),
    entryExitSame:true,
    doorCollisions: {
      leadsToPrev:{ 
        hasLift: false,
        boundary:generateBoundaries(firstFloorLabExit, 9044),
      },
      leadsToNext: {
        hasLift: false,
        boundary:[],
      },
      directionOnNextMap: FACING_DOWN,
      directionOnPrevMap: FACING_UP,
    },
    mapLoadTextTriggers: [
      {
        trigger: true,
        message: ["You've reached computer lab"],
        hasShown: false,
      }
    ],
    collisionTextTriggers: collisionTextTriggers.map5,
    transitioningFrom: "map4",
    transitioningTo: "map4",
    mapPosition: { 
      enterFromFrontPosition : {x:920,y:390},
      enterFromLiftPosition : {x:1380 , y:1050}
    },
  },
  map6: {
    backgroundMap: secondFloorEntrance,
    boundaries: generateBoundaries(secondFloorBoundaries, 1),
    obstacleBoundary: [],
    entryExitSame:false,
    doorCollisions: {
      leadsToPrev:{ 
        hasLift: true,
        boundary:generateBoundaries(secondFloorLift, 1),
      },
      leadsToNext: {
        hasLift: false,
        boundary:generateBoundaries(interaction,9497),
      },
      directionOnNextMap: FACING_LEFT,
      directionOnPrevMap: FACING_DOWN,
    },
    mapLoadTextTriggers: [
      {
        trigger: false,
        message: ["You've reached second floor"],
        hasShown: false,
      }
    ],
    collisionTextTriggers: [],
    transitioningFrom: "map5",
    transitioningTo: "map7",
    mapPosition: { 
      enterFromFrontPosition : {x:280,y:500},
      enterFromLiftPosition : {x:1380 , y:1050}
    },
  },
  map7: {
    backgroundMap: secondFloorGallery,
    boundaries: generateBoundaries(secondFloor2Boundaries, 10937),
    obstacleBoundary: [],
    hasTwoDoors:true,
    doorCollisions: {
      leadsToPrev:{ 
        hasLift: false,
        boundary:generateBoundaries(firstFloorCorridorExitCollision, 62005),
      },
      leadsToPrevFromLeft:{ 
        hasLift: false,
        boundary:[],
      },
      leadsToPrevFromRight:{ 
        hasLift: false,
        boundary:[],
      },
      leadsToNext: {
        hasLift: false,
        boundary:[],
      },
      leadsToNextFromRight: {
        hasLift: false,
        boundary:generateBoundaries(secondFloor2rightGate,10937),
      },
      leadsToNextFromLeft: {
        hasLift: false,
        boundary:generateBoundaries(secondFloor2LeftGate,10937),
      },
      directionOnNextMap: FACING_DOWN,
      directionOnPrevMap: FACING_RIGHT,
    },
    mapLoadTextTriggers: [],
    collisionTextTriggers: [],
    transitioningFrom: "map6",
    transitioningTo: "map8",
    mapPosition: { 
      enterFromFrontPosition : {x:1200,y:520},
      enterFromFrontRightPosition : {x:1380,y:520},
      enterFromFrontLeftPosition : {x:200,y:520},
      enterFromLiftPosition : {x:1380 , y:400}
    },
  },
  map8: {
    backgroundMap: secondFloorPPTHall,
    boundaries: generateBoundaries(secondFloor3Boundaries, 16868),
    obstacleBoundary: generateBoundaries(pptHallInteraction, 16868),
    entryExitSame:true,
    hasTwoDoors:true,
    doorCollisions: {
      leadsToPrev:{ 
        hasLift: false,
        boundary:[],
      },
      leadsToPrevFromRight:{ 
        hasLift: false,
        boundary:generateBoundaries(secondFloor3rightGate, 16868),
      },
      leadsToPrevFromLeft:{ 
        hasLift: false,
        boundary:generateBoundaries(secondFloor3LeftGate, 16868),
      },
      leadsToNext: {
        hasLift: false,
        boundary:[],
      },
      leadsToNextFromRight: {
        hasLift: false,
        boundary:[],
      },
      leadsToNextFromLeft: {
        hasLift: false,
        boundary:[],
      },
      directionOnNextMap: FACING_LEFT,
      directionOnPrevMap: FACING_UP,
    },
    mapLoadTextTriggers: [
      {
        trigger: true,
        message: ["You've reached PPT Hall"],
        hasShown: false,
      }
    ],
    collisionTextTriggers: collisionTextTriggers.map8,
    transitioningFrom: "map7",
    transitioningTo: "map8",
    mapPosition: { 
      enterFromFrontRightPosition : {x:1500,y:500},
      enterFromFrontLeftPosition : {x:300,y:450},
      enterFromLiftPosition : {x:1380 , y:1050}
    },
  },
};

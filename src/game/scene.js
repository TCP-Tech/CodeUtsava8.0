import { cccEntranceCollisionArray, cccEntranceGuideMapCollisionArray, cccEntryGateCollisionArray } from '../gameData/cccEntranceBoundaries/cccAllBoundary.js';
import { groundFloorCollisions, groundFloorTableBoundary, groundFloorGateBoundary, groundFloorLiftBoundary } from '../gameData/cccGroundFloorBoundaries/gfAllBoundary.js';
import { lift, firstFloorCollisions, interaction } from '../gameData/firstFloorBoundaries/firstFloorAllBoundaries.js';
import { CYCLE_LOOP, FRAME_LIMIT, FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT, MOVEMENT_SPEED, SCALED_WIDTH, SCALED_HEIGHT, FADE_OUT_SPEED } from './constants.js';
import cccMap from "../gameAssets/FinalCCC.png";
import groundFloor from "../gameAssets/FinalGroundFloor.png";
import firstFloor from "../gameAssets/FirstFloorFinal.png";

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
  ]
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
      enterFromFrontPosition : {x:780,y:980},
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
      enterFromLiftPosition : {x:1180 , y:600}
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
      enterFromFrontPosition : {x:1380,y:1050},
      enterFromLiftPosition : {x:1380 , y:1050}
      // nextMapsPosition: { x: 1380, y: 1050 },
      // prevMapPosition: { x: 1180, y: 600 }
    },
  },
};

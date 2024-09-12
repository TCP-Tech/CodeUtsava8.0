import { cccEntranceCollisionArray , cccEntranceGuideMapCollisionArray ,  cccEntryGateCollisionArray } from '../gameData/cccEntranceBoundaries/cccAllBoundary.js';
import { groundFloorCollisions,groundFloorTableBoundary, groundFloorGateBoundary, groundFloorLiftBoundary } from '../gameData/cccGroundFloorBoundaries/gfAllBoundary.js';
import { lift , firstFloorCollisions , interaction } from '../gameData/firstFloorBoundaries/firstFloorAllBoundaries.js';
import { CYCLE_LOOP, FRAME_LIMIT, FACING_UP, FACING_DOWN, FACING_LEFT, FACING_RIGHT, MOVEMENT_SPEED, SCALED_WIDTH, SCALED_HEIGHT, FADE_OUT_SPEED } from './constants.js';
import cccMap from "../gameAssets/FinalCCC.png";
import groundFloor from "../gameAssets/FinalGroundFloor.png";
import firstFloor from "../gameAssets/FirstFloor.png"

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

export const maps = {
  map1: {
    backgroundMap: cccMap,
    boundaries: generateBoundaries(cccEntranceCollisionArray, 3579),
    obstacleBoundary: generateBoundaries(cccEntranceGuideMapCollisionArray, 3579),
    doorCollisions: {
      leadsToPrev: [],
      leadsToNext: generateBoundaries(cccEntryGateCollisionArray, 3579),
      directionOnNextMap:FACING_UP,
      directionOnPrevMap:FACING_DOWN,
    },
    mapLoadTextTriggers: [
      {
        message: ["You've made it to the entrance of Central Computer Center!!"],
        hasShown: false,
      },
    ],
    collisionTextTriggers: [
      {
        obstacleType: 'guidePost',
        message: ["You've collided into the guide post.."],
        hasShown: false,
        element: `
          <div>
            <h2>Guide Post Information</h2>
            <p>This is the guide post located at the entrance. It provides information about various sections on this floor.</p>
            <ul>
              <li><strong>Floor 1:</strong> Introduction and Overview</li>
              <li><strong>Floor 2:</strong> Developer Meet and Greet</li>
            </ul>
          </div>
        `
      },
    ],
    transitioningFrom: "",
    transitioningTo: "map2",
    mapPosition: {
      nextMapsPosition: { x: 780, y: 1050 },
      prevMapPosition: { x: 780, y: 980 }
    },
  },
  map2: {
    backgroundMap: groundFloor,
    boundaries: generateBoundaries(groundFloorCollisions, 14463),
    obstacleBoundary: generateBoundaries(groundFloorTableBoundary, 14463),
    doorCollisions: {
      leadsToPrev: generateBoundaries(groundFloorGateBoundary, 14463),
      leadsToNext: generateBoundaries(groundFloorLiftBoundary, 14463),
      directionOnNextMap:FACING_DOWN,
      directionOnPrevMap:FACING_DOWN,
    },
    mapLoadTextTriggers: [
      {
        trigger: true,
        message: ["You've reached ground floor"],
        hasShown: false,
      }
    ],
    collisionTextTriggers: [
      {
        obstacleType: 'reception',
        message: ["Welcome to Central Computer Center!" , "Here  are some FAQS about CodeUtsava"],
        hasShown: false,
        element: `
          <div>
            <h2>Reception Information</h2>
            <p>Welcome to the reception of the Central Computer Center. Here you can find information and FAQs about Codeutsava.</p>
            <ul>
              <li><strong>General Info:</strong> Details about the event.</li>
              <li><strong>Help Desk:</strong> Assistance and support.</li>
            </ul>
          </div>
        `
      },
    ],
    transitioningFrom: "map1",
    transitioningTo: "map3",
    mapPosition: { 
      nextMapsPosition : { x: 1380, y: 1050 },
      prevMapPosition  :  { x: 780, y: 980 }
     },
  },

  
  map3: {
    backgroundMap: firstFloor,
    boundaries: generateBoundaries(firstFloorCollisions, 9497),
    obstacleBoundary: [],
    doorCollisions: {
      leadsToPrev: generateBoundaries(lift, 9497),
      leadsToNext: generateBoundaries(interaction, 9497),
      directionOnNextMap:FACING_LEFT,
      directionOnPrevMap:FACING_DOWN,
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
      nextMapsPosition : { x: 1380, y: 1050 },
      prevMapPosition  :{x: 1180, y: 600}
     },
  },
};
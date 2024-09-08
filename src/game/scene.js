import { cccEntranceCollisionArray } from '../gameData/cccEntrance/cccEntranceMapCollisionBoundary.js';
import { cccEntranceGuideMapCollisionArray } from '../gameData/cccEntrance/guideMapCollisionBoundary.js';
import { cccEntryGateCollisionArray } from '../gameData/cccEntrance/cccEntranceGateCollisionBoundary.js';
import { groundFloorTableBoundary, groundFloorGateBoundary, groundFloorLiftBoundary } from '../gameData/groundFloorAllBoundaries.js';
import { groundFloorCollisions } from '../gameData/groundFloorCollisions.js';
import cccMap from "../gameAssets/cccfinal.png";
import groundFloor from "../gameAssets/groundFloor.png";

function generateBoundaries(boundary, key) {
  let collisionMatrix = [];
  for (let i = 0; i < boundary.length; i += 70) {
    collisionMatrix.push(boundary.slice(i, 70 + i));
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

export const maps = {
  map1: {
    backgroundMap: cccMap,
    boundaries: generateBoundaries(cccEntranceCollisionArray, 3591),
    obstacleBoundary: generateBoundaries(cccEntranceGuideMapCollisionArray, 1935),
    doorCollisions: {
      leadsToPrev: [],
      leadsToNext: generateBoundaries(cccEntryGateCollisionArray, 1234),
    },
    mapLoadTextTriggers: [
      {
        message: ["Well well look who's here...", "You made it to the entrance!"],
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
    spawnPoint: { x: 800, y: 500 },
    mapPosition: { x: 480, y: 450 },
  },
  map2: {
    backgroundMap: groundFloor,
    boundaries: generateBoundaries(groundFloorCollisions, 14599),
    obstacleBoundary: generateBoundaries(groundFloorTableBoundary, 14599),
    doorCollisions: {
      leadsToPrev: generateBoundaries(groundFloorGateBoundary, 14599),
      leadsToNext: generateBoundaries(groundFloorLiftBoundary, 14599),
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
        message: ["Welcome to Central Computer Center!"],
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
    spawnPoint: { x: 150, y: 50 },
    mapPosition: { x: 480, y: 100 },
  },
};

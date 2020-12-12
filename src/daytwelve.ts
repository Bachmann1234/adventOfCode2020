import fs from 'fs';

export enum AbsoluteDirection {
  FORWARD = 0,
  LEFT,
  RIGHT
}

export enum CardinalDirection {
  NORTH = 4,
  EAST,
  SOUTH,
  WEST
}

type Direction = CardinalDirection | AbsoluteDirection;

type Command = {
  unit: number;
  direction: Direction;
};

interface Position {
  x: number;
  y: number;
}

interface ShipPosition extends Position {
  facing: CardinalDirection;
}

type MapState = {
  shipPosition: ShipPosition;
  wayPointOffset: Position;
};

const INITIAL_POSITION = {
  x: 0,
  y: 0,
  facing: CardinalDirection.EAST
};

const INITIAL_OFFSET = {
  x: 10,
  y: 1
};

const INITIAL_MAP_STATE = {
  shipPosition: INITIAL_POSITION,
  wayPointOffset: INITIAL_OFFSET
};

const commandMap: Map<string, Direction> = new Map();
commandMap.set('N', CardinalDirection.NORTH);
commandMap.set('S', CardinalDirection.SOUTH);
commandMap.set('E', CardinalDirection.EAST);
commandMap.set('W', CardinalDirection.WEST);
commandMap.set('L', AbsoluteDirection.LEFT);
commandMap.set('R', AbsoluteDirection.RIGHT);
commandMap.set('F', AbsoluteDirection.FORWARD);

export function reletiveRotate(wayPointOffset: Position, direction: AbsoluteDirection): Position {
  const newOffset = {
    x: wayPointOffset.x,
    y: wayPointOffset.y
  };
  const inQuadOne = wayPointOffset.x > 0 && wayPointOffset.y > 0;
  const inQuadTwo = wayPointOffset.x < 0 && wayPointOffset.y > 0;
  const inQuadThree = wayPointOffset.x < 0 && wayPointOffset.y < 0;
  if (direction === AbsoluteDirection.FORWARD) {
    throw new Error('This should not be hit. You called reletiveRotate with forward');
  } else if (direction === AbsoluteDirection.RIGHT) {
    if (inQuadOne) {
      newOffset.x *= -1;
      [newOffset.x, newOffset.y] = [newOffset.y, newOffset.x];
    } else if (inQuadTwo) {
      newOffset.x *= -1;
      [newOffset.x, newOffset.y] = [newOffset.y, newOffset.x];
    } else if (inQuadThree) {
      [newOffset.x, newOffset.y] = [newOffset.y, newOffset.x];
      newOffset.y *= -1;
    } else {
      [newOffset.x, newOffset.y] = [newOffset.y, newOffset.x];
      newOffset.y *= -1;
    }
  } else if (inQuadOne) {
    newOffset.y *= -1;
    [newOffset.x, newOffset.y] = [newOffset.y, newOffset.x];
  } else if (inQuadTwo) {
    newOffset.y *= -1;
    [newOffset.x, newOffset.y] = [newOffset.y, newOffset.x];
  } else if (inQuadThree) {
    [newOffset.x, newOffset.y] = [newOffset.y, newOffset.x];
    newOffset.x *= -1;
  } else {
    [newOffset.x, newOffset.y] = [newOffset.y, newOffset.x];
    newOffset.x *= -1;
  }
  return newOffset;
}

export function executeCommandsPartTwo(initialMapState: MapState, commands: Command[]): MapState {
  return commands.reduce((state, command) => {
    const newShipPosition = {
      x: state.shipPosition.x,
      y: state.shipPosition.y,
      facing: CardinalDirection.EAST
    };
    let newWaypointOffset = { x: state.wayPointOffset.x, y: state.wayPointOffset.y };
    if (command.direction === CardinalDirection.NORTH) {
      newWaypointOffset.y += command.unit;
    } else if (command.direction === CardinalDirection.SOUTH) {
      newWaypointOffset.y -= command.unit;
    } else if (command.direction === CardinalDirection.EAST) {
      newWaypointOffset.x += command.unit;
    } else if (command.direction === CardinalDirection.WEST) {
      newWaypointOffset.x -= command.unit;
    } else if (command.direction === AbsoluteDirection.FORWARD) {
      newShipPosition.x += command.unit * newWaypointOffset.x;
      newShipPosition.y += command.unit * newWaypointOffset.y;
    } else {
      let degrees = command.unit;
      while (degrees > 0) {
        degrees -= 90;
        newWaypointOffset = reletiveRotate(newWaypointOffset, command.direction);
      }
    }
    return {
      shipPosition: newShipPosition,
      wayPointOffset: newWaypointOffset
    };
  }, initialMapState);
}

export function computeManhattanDistance(position: ShipPosition): number {
  return Math.abs(position.x) + Math.abs(position.y);
}

export function executeCommandsPartOne(
  initialPosition: ShipPosition,
  commands: Command[]
): ShipPosition {
  return commands.reduce((position, command) => {
    let newPosition = null;
    let xOffset = 0;
    let yOffset = 0;
    if (command.direction === CardinalDirection.NORTH) {
      yOffset += command.unit;
    } else if (command.direction === CardinalDirection.SOUTH) {
      yOffset -= command.unit;
    } else if (command.direction === CardinalDirection.EAST) {
      xOffset += command.unit;
    } else if (command.direction === CardinalDirection.WEST) {
      xOffset -= command.unit;
    } else if (
      command.direction === AbsoluteDirection.LEFT ||
      command.direction === AbsoluteDirection.RIGHT
    ) {
      let degrees = command.unit;
      let curPosition = position.facing;
      while (degrees > 0) {
        degrees -= 90;
        if (command.direction === AbsoluteDirection.LEFT) {
          if (curPosition === CardinalDirection.NORTH) {
            curPosition = CardinalDirection.WEST;
          } else if (curPosition === CardinalDirection.SOUTH) {
            curPosition = CardinalDirection.EAST;
          } else if (curPosition === CardinalDirection.EAST) {
            curPosition = CardinalDirection.NORTH;
          } else {
            curPosition = CardinalDirection.SOUTH;
          }
        } else if (curPosition === CardinalDirection.NORTH) {
          curPosition = CardinalDirection.EAST;
        } else if (curPosition === CardinalDirection.SOUTH) {
          curPosition = CardinalDirection.WEST;
        } else if (curPosition === CardinalDirection.EAST) {
          curPosition = CardinalDirection.SOUTH;
        } else {
          curPosition = CardinalDirection.NORTH;
        }
      }
      newPosition = curPosition;
    } else if (command.direction === AbsoluteDirection.FORWARD) {
      if (position.facing === CardinalDirection.NORTH) {
        yOffset += command.unit;
      } else if (position.facing === CardinalDirection.SOUTH) {
        yOffset -= command.unit;
      } else if (position.facing === CardinalDirection.EAST) {
        xOffset += command.unit;
      } else {
        xOffset -= command.unit;
      }
    }
    return {
      x: xOffset + position.x,
      y: yOffset + position.y,
      facing: newPosition === null ? position.facing : newPosition
    };
  }, initialPosition);
}

export function parseInput(data: string): Command[] {
  return data.split('\n').map((rawCommand) => {
    const match = rawCommand.match(/([NSEWLRF])(\d+)/);
    if (match === null) {
      throw Error('Command invalid!');
    }
    const direction = commandMap.get(match[1]);
    if (direction === undefined) {
      throw Error('Invalid command');
    }
    return { unit: Number.parseInt(match[2], 10), direction };
  });
}

if (require.main === module) {
  const data = fs.readFileSync('input/dayTwelve', 'utf-8');
  const commands = parseInput(data);
  const finalPositionPartOne = executeCommandsPartOne(INITIAL_POSITION, commands);
  console.log(computeManhattanDistance(finalPositionPartOne));
  const finalPositionPartTwo = executeCommandsPartTwo(INITIAL_MAP_STATE, commands).shipPosition;
  console.log(computeManhattanDistance(finalPositionPartTwo));
}

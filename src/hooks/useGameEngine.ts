import { RefObject } from 'react';

interface GameObject {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: { x: number; y: number };
  color: string;
}

interface GameState {
  players: Record<number, GameObject>;
  projectiles: GameObject[];
  powerUps: GameObject[];
  scores: Record<number, number>;
  gameOver: boolean;
}

export function useGameEngine(
  canvasRef: RefObject<HTMLCanvasElement>,
  players: { id: number; username: string }[],
  currentPlayerId?: number
) {
  const GAME_CONFIG = {
    playerSpeed: 5,
    projectileSpeed: 7,
    powerUpSpawnInterval: 5000,
    roundDuration: 180000, // 3 minutes
  };

  const initGame = (): GameState => {
    const initialPlayers: Record<number, GameObject> = {};
    
    players.forEach((player, index) => {
      const startX = index === 0 ? 100 : canvasRef.current!.width - 100;
      initialPlayers[player.id] = {
        id: player.id,
        x: startX,
        y: canvasRef.current!.height / 2,
        width: 40,
        height: 40,
        velocity: { x: 0, y: 0 },
        color: index === 0 ? '#4F46E5' : '#DC2626',
      };
    });

    return {
      players: initialPlayers,
      projectiles: [],
      powerUps: [],
      scores: Object.fromEntries(players.map(p => [p.id, 0])),
      gameOver: false,
    };
  };

  const handleInput = (keyCode: string) => {
    switch (keyCode) {
      case 'ArrowUp':
      case 'KeyW':
        return { type: 'MOVE', direction: 'up' };
      case 'ArrowDown':
      case 'KeyS':
        return { type: 'MOVE', direction: 'down' };
      case 'ArrowLeft':
      case 'KeyA':
        return { type: 'MOVE', direction: 'left' };
      case 'ArrowRight':
      case 'KeyD':
        return { type: 'MOVE', direction: 'right' };
      case 'Space':
        return { type: 'SHOOT' };
      default:
        return null;
    }
  };

  const processAction = (state: GameState, playerId: number, action: any) => {
    const player = state.players[playerId];
    if (!player) return state;

    switch (action.type) {
      case 'MOVE': {
        const newVelocity = { ...player.velocity };
        switch (action.direction) {
          case 'up':
            newVelocity.y = -GAME_CONFIG.playerSpeed;
            break;
          case 'down':
            newVelocity.y = GAME_CONFIG.playerSpeed;
            break;
          case 'left':
            newVelocity.x = -GAME_CONFIG.playerSpeed;
            break;
          case 'right':
            newVelocity.x = GAME_CONFIG.playerSpeed;
            break;
        }
        return {
          ...state,
          players: {
            ...state.players,
            [playerId]: {
              ...player,
              velocity: newVelocity,
            },
          },
        };
      }
      case 'SHOOT': {
        const angle = Math.atan2(
          action.target.y - player.y,
          action.target.x - player.x
        );
        const projectile: GameObject = {
          id: Date.now(),
          x: player.x,
          y: player.y,
          width: 8,
          height: 8,
          velocity: {
            x: Math.cos(angle) * GAME_CONFIG.projectileSpeed,
            y: Math.sin(angle) * GAME_CONFIG.projectileSpeed,
          },
          color: player.color,
        };
        return {
          ...state,
          projectiles: [...state.projectiles, projectile],
        };
      }
      default:
        return state;
    }
  };

  const updateGame = (state: GameState, deltaTime: number) => {
    if (!state || !canvasRef.current) return state;

    const canvas = canvasRef.current;
    const newState = { ...state };

    // Update player positions
    Object.entries(newState.players).forEach(([id, player]) => {
      const newX = player.x + player.velocity.x;
      const newY = player.y + player.velocity.y;

      // Boundary checks
      if (newX >= 0 && newX <= canvas.width - player.width) {
        player.x = newX;
      }
      if (newY >= 0 && newY <= canvas.height - player.height) {
        player.y = newY;
      }
    });

    // Update projectiles
    newState.projectiles = newState.projectiles
      .filter((projectile) => {
        const inBounds =
          projectile.x >= 0 &&
          projectile.x <= canvas.width &&
          projectile.y >= 0 &&
          projectile.y <= canvas.height;

        // Check collisions with players
        Object.entries(newState.players).forEach(([id, player]) => {
          if (checkCollision(projectile, player)) {
            newState.scores[id] = (newState.scores[id] || 0) + 10;
            return false;
          }
        });

        return inBounds;
      })
      .map((projectile) => ({
        ...projectile,
        x: projectile.x + projectile.velocity.x,
        y: projectile.y + projectile.velocity.y,
      }));

    return newState;
  };

  const renderGame = (ctx: CanvasRenderingContext2D, state: GameState) => {
    if (!state) return;

    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw players
    Object.values(state.players).forEach((player) => {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);
    });

    // Draw projectiles
    state.projectiles.forEach((projectile) => {
      ctx.fillStyle = projectile.color;
      ctx.beginPath();
      ctx.arc(
        projectile.x,
        projectile.y,
        projectile.width / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  };

  const checkCollision = (obj1: GameObject, obj2: GameObject) => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  };

  return {
    initGame,
    handleInput,
    processAction,
    updateGame,
    renderGame,
  };
}
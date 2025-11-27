import * as PIXI from 'pixi.js';
import { Enemy } from '../types/game.types';
import { GAME_CONFIG } from '../constants/game.constants';

export class EnemyManager {
  private enemies: Enemy[] = [];
  private app: PIXI.Application | null = null;

  createEnemy(id: number, app: PIXI.Application): Enemy {
    const sprite = new PIXI.Graphics();
    
    sprite.beginFill(0xe74c3c);
    sprite.drawCircle(GAME_CONFIG.ENEMY_SIZE / 2, GAME_CONFIG.ENEMY_SIZE / 2, GAME_CONFIG.ENEMY_SIZE / 2);
    sprite.endFill();
    
    sprite.beginFill(0xffffff);
    sprite.drawCircle(GAME_CONFIG.ENEMY_SIZE / 3, GAME_CONFIG.ENEMY_SIZE / 3, GAME_CONFIG.ENEMY_SIZE / 8);
    sprite.drawCircle((GAME_CONFIG.ENEMY_SIZE * 2) / 3, GAME_CONFIG.ENEMY_SIZE / 3, GAME_CONFIG.ENEMY_SIZE / 8);
    sprite.endFill();
    
    sprite.beginFill(0x000000);
    sprite.drawCircle(GAME_CONFIG.ENEMY_SIZE / 3, GAME_CONFIG.ENEMY_SIZE / 3, GAME_CONFIG.ENEMY_SIZE / 16);
    sprite.drawCircle((GAME_CONFIG.ENEMY_SIZE * 2) / 3, GAME_CONFIG.ENEMY_SIZE / 3, GAME_CONFIG.ENEMY_SIZE / 16);
    sprite.endFill();
    
    sprite.x = Math.random() * (GAME_CONFIG.CANVAS_WIDTH - GAME_CONFIG.ENEMY_SIZE);
    sprite.y = Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.ENEMY_SIZE);
    sprite.interactive = true;
    sprite.cursor = 'pointer';
    
    app.stage.addChild(sprite);
    
    return {
      id,
      sprite,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      animSpeed: 0.05 + Math.random() * 0.05,
      animFrame: 0
    };
  }

  updateEnemies(enemies: Enemy[]) {
    enemies.forEach(enemy => {
      if (!enemy.sprite.parent) return;
      
      enemy.sprite.x += enemy.vx;
      enemy.sprite.y += enemy.vy;

      if (enemy.sprite.x <= 0 || enemy.sprite.x >= GAME_CONFIG.CANVAS_WIDTH - GAME_CONFIG.ENEMY_SIZE) {
        enemy.vx = -enemy.vx;
        enemy.sprite.x = Math.max(0, Math.min(GAME_CONFIG.CANVAS_WIDTH - GAME_CONFIG.ENEMY_SIZE, enemy.sprite.x));
      }
      if (enemy.sprite.y <= 0 || enemy.sprite.y >= GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.ENEMY_SIZE) {
        enemy.vy = -enemy.vy;
        enemy.sprite.y = Math.max(0, Math.min(GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.ENEMY_SIZE, enemy.sprite.y));
      }

      enemy.animFrame += enemy.animSpeed;
      const scale = 1 + Math.sin(enemy.animFrame) * 0.1;
      enemy.sprite.scale.set(scale);
    });
  }

  destroyEnemy(enemy: Enemy) {
    if (enemy.sprite.parent) {
      enemy.sprite.parent.removeChild(enemy.sprite);
      enemy.sprite.destroy();
    }
  }

  destroyAll(enemies: Enemy[]) {
    enemies.forEach(enemy => this.destroyEnemy(enemy));
  }
}

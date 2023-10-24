import app from '../pixi/initialize';
import { playerStats } from './stats';

app.ticker.add(() => {
  if (playerStats.life <= 0) {}
});

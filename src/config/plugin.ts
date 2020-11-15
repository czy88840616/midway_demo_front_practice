import { EggPlugin } from 'egg';
export default {
  static: false, // default is true
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  }
} as EggPlugin;

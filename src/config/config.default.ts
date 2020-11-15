import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { join } from 'path';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605453188272_415';

  // add your config here
  config.middleware = [];

  config.view = {
    defaultViewEngine: 'nunjucks',
    root: [
      join(appInfo.baseDir, 'view'),
    ].join(',')
  };

  return config;
};

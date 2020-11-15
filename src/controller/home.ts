import { ALL, Controller, Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { Context } from 'egg';

@Provide()
@Controller('/')
export class HomeController {

  @Inject()
  ctx: Context;

  // http://localhost:7001/
  @Get('/')
  async index(@Query(ALL) params) {
    return `<p>hi, ${params.name || 'midway'}</p>`;
  }

  @Get('/say-hello.json')
  async sayHello(@Query(ALL) params) {
    return {
      success: true,
      message: '请求成功',
      data: `hi, ${params.name || 'midway'}`
    };
  }

  //http://localhost:7001/index.htm?name=zhangting
  @Get('/say-hello.json')
  async home(@Query(ALL) params) {
    const result = {
      name: params.name || 'midway',
      title: '前端练习生'
    }
    await this.ctx.render('home.html', result);
  }
}

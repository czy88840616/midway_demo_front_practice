import { Provide, Aspect, IMethodAspect, JoinPoint } from '@midwayjs/decorator';
import { EmailController } from '../controller/email';

@Provide()
@Aspect(EmailController, 'sendEmail')
export class FilterEmailInfo implements IMethodAspect {
  async around(point: JoinPoint) {
    try {
      const result = await point.proceed(...point.args);  // 执行原方法
      return result;
    } catch(err) {
      return err;
    }
  }
}
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getApiRoot() {
    return {
      name: 'AbleSpace API',
      status: 'running',
    };
  }
}

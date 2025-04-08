import { Controller, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

class healthCheckDTO {
  @ApiProperty()
  serverUpTime: string;
}

@ApiTags('Health')
@Controller()
export class HealthController {
  constructor() {}
  @ApiOperation({ summary: 'Server health check' })
  @ApiResponse({ status: 200, type: healthCheckDTO })
  @Get()
  index() {
    const upTime = process.uptime();

    const format = (time) => {
      const pad = (s) => (s < 10 ? '0' : '') + s;

      const hours = Math.floor(time / (60 * 60));
      const minutes = Math.floor((time % (60 * 60)) / 60);
      const seconds = Math.floor(time % 60);

      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    return { serverUpTime: format(upTime) };
  }
}

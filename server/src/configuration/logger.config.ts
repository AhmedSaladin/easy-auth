import { Params } from 'nestjs-pino';
import configuration from './configuration';
import { v4 as uuidv4 } from 'uuid';

export default {
  pinoHttp:
    configuration.NODE_ENV == 'development'
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              ignore: 'pid,hostname,host',
              translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
            },
          },
        }
      : {
          genReqId: (request) => request.headers['x-correlation-id'] || uuidv4(),
          redact: ['req.headers.authorization', 'req.body.password'],
          serializers: {
            req: (req) => {
              req.body = req.raw.body;
              return req;
            },
          },
          customProps: (req, res) => ({
            httpRequest: {
              requestMethod: req.method,
              requestUrl: req.url,
              status: res.statusCode,
              userAgent: req.headers['user-agent'],
            },
            user: {
              name: req['user']?.name,
              mobile: req['user']?.mobile,
            },
            // eslint-disable-next-line prettier/prettier
            severity: res.statusCode >= 500 ? 'ERROR' : res.statusCode >= 400 ? 'WARN' : 'INFO',
          }),
          autoLogging: {
            ignore: function (req) {
              return req && req.url && req.url.includes('/health');
            },
          },
        },
} as Params;

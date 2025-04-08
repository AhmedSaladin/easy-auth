import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // this is how we extract the token from the request
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'), // this is the secret we use to sign our tokens
    });
  }

  async validate(payload: any) {
    return { userId: payload.id };
  }
}

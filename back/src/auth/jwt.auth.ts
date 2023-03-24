import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type JwtUserPayload = { userId: string; username: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('AUTH_SECRET_KEY'),
        });
    }

    async validate(payload: { id: string; username: string }): Promise<JwtUserPayload> {
        return { userId: payload.id, username: payload.username };
    }
}

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.PRIVATE_KEY_AT,
            passReqToCallback: true,

        })
    }
    async validate(req: Request ,payload: any) {
        const refreshToken = req.get('authorixation').replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken,
        }
    }
}
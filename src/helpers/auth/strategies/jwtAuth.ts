import { Strategy, ExtractJwt } from "passport-jwt";

import { envConfig } from "../../../config/env";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: envConfig.jwtSecret,
};

export const JwtStrategy = new Strategy(options, (payload, done) => {
    return done(null, payload);
});

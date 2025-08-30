import passport from "passport";

import { LocalStrategy } from "./strategies/localAuth";
import { JwtStrategy } from "./strategies/jwtAuth";

passport.use(LocalStrategy);
passport.use(JwtStrategy);

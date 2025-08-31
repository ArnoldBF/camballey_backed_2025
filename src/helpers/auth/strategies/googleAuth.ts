import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { envConfig } from "../../../config/env";

passport.use(
    new GoogleStrategy(
        {
            clientID: String(envConfig.googleClientId),
            clientSecret: String(envConfig.googleClientSecret),
            callbackURL:
                "https://camballeybacked2025-production.up.railway.app/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = {
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails?.[0]!.value,
            };
            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
type User = {
    googleId: string;
    displayName: string;
    email?: string;
};

passport.deserializeUser((obj: User, done) => {
    done(null, obj);
});

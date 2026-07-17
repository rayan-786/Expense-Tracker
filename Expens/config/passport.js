const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
    `${process.env.BACKEND_URL}/api/auth/github/callback`,
      scope: ["user:email"],
    },

    async (accessToken, refreshToken, profile, done) => {
      try {

        let email = null;

        if (
          profile.emails &&
          profile.emails.length > 0
        ) {
          email = profile.emails[0].value;
        }

        return done(null, {
          githubId: profile.id,
          name: profile.displayName || profile.username,
          email,
        });

      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import { UserModel } from '../modules/user/model/user.model';

export default function () {
  passport.use(
    new Strategy(
      {
        clientID: process.env['GOOGLE_CLIENT_ID'] as string,
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
        callbackURL: '/auth/google/redirect',
        state: true,
      },
      (_, __, profile, done) => {
        UserModel.findOne({ googleId: profile.id }).then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            new UserModel({
              provider: profile.provider,
              googleId: profile.id,
              displayName: profile.displayName,
              name: {
                firstName: profile.name?.givenName,
                lastName: profile.name?.familyName,
              },
              email: profile.emails![0].value,
              photos: profile.photos,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.findById(id).then((user) => {
      done(null, user);
    });
  });
}

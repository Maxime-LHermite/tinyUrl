import { UserModel } from './UserModel';

export type AuthenticationModel =
    | {
          status: 'Authenticated';
          user: UserModel;
      }
    | {
          status: 'NotAuthenticated';
      };

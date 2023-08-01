import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'testsecret', // Replace with your actual secret key
    });
  }

  async validate(payload: any): Promise<User> {
    // Implement your logic to validate the user based on the JWT payload
    // For example, you can fetch the user from the database using the payload sub (user ID)
    const { email } = payload;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // If user not found, throw UnauthorizedException
      throw new UnauthorizedException();
    }
    return user; // Return the authenticated user object
  }
}

import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/guard/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { Role } from '../enums/role.enum';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      return user?.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

import { Role } from 'src/user/enums/role.enum';
import User from '../../user/entity/user.entity';

const mockedUser: User = {
  id: 1,
  email: 'user@email.com',
  name: 'John',
  password: 'hash',
  phoneNumber: '+48123123123',
  address: {
    id: 1,
    street: 'streetName',
    city: 'cityName',
    country: 'contryName',
  },
  isTwoFactorAuthenticationEnabled: false,
  isPhoneNumberConfirmed: false,
  twoFactorAuthenticationSecret: null,
  isEmailConfirmed: false,
  isRegisteredWithGoogle: false,
  role: Role.User,
  permissions: [],
};

export default mockedUser;

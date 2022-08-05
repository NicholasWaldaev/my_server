import User from '../../user/entity/user.entity';

const mockedUser: User = {
  id: 1,
  email: 'user@email.com',
  name: 'John',
  password: 'hash',
  address: {
    id: 1,
    street: 'streetName',
    city: 'cityName',
    country: 'contryName',
  },
  isTwoFactorAuthenticationEnabled: false,
};

export default mockedUser;

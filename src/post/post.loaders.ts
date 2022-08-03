import { Injectable, Scope } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export default class PostLoaders {
  constructor(private userService: UserService) {}

  public readonly batchAuthors = new DataLoader(async (authorIds: number[]) => {
    const users = await this.userService.getByIds(authorIds);
    const usersMap = new Map(users.map((user) => [user.id, user]));
    return authorIds.map((authorId) => usersMap.get(authorId));
  });
}

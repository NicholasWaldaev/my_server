import { CategoriesPermission } from './enums/categoriesPermission.enum';
import { PostsPermission } from './enums/postsPermission.enum';

const Permission = {
  ...PostsPermission,
  ...CategoriesPermission,
};

type Permission = PostsPermission | CategoriesPermission;

export default Permission;

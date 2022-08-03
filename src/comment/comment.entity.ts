import Post from '../post/entity/post.entity';
import User from '../user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Comment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @ManyToOne(() => Post, (post: Post) => post.comment)
  public post: Post;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}

export default Comment;

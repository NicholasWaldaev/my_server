import User from '../../user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import Category from '../../category/category.entity';
import Comment from '../../comment/comment.entity';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  scheduledDate?: Date;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column('text', { array: true, nullable: true })
  public paragraphs?: string[];

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @RelationId((post: Post) => post.author)
  public authorId: number;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  public comment: Comment[];
}

export default Post;

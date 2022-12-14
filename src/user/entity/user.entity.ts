import { Exclude } from 'class-transformer';
import Post from '../../post/entity/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Address from './address.entity';
import DatabaseFile from '../../files/databaseFile.entity';
import { Role } from '../enums/role.enum';
import Permission from '../permission.type';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;

  @Column({ nullable: true })
  public twoFactorAuthenticationSecret?: string;

  @Column({ unique: true })
  public email: string;

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @Column({ nullable: true })
  public phoneNumber: string;

  @Column({ default: false })
  public isPhoneNumberConfirmed: boolean;

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column()
  public name: string;

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => DatabaseFile, { nullable: true })
  public avatar?: DatabaseFile;

  @Column({ nullable: true })
  public avatarId?: number;

  @Column({ nullable: true })
  @Exclude()
  public password: string;

  @Column({ default: false })
  public isRegisteredWithGoogle: boolean;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];

  @Column({
    type: 'enum',
    enum: Permission,
    array: true,
    default: [],
  })
  public permissions: Permission[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public role: Role;
}

export default User;

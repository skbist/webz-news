import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  title: string;

  @Column({ nullable: true })
  url: string;

  @Column('text')
  text: string;

  @Column({ nullable: true })
  author: string;
}

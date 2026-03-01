import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'accounts' })
export class Account {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

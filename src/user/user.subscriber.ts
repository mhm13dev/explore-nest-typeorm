import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { hash } from 'argon2';
import { deserialize } from '@phc/format';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    event.entity.password = await hash(event.entity.password);
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    if (!event.entity) return;
    if (this.doesPasswordNeedsToBeHashed(event.entity)) {
      event.entity.password = await hash(event.entity.password);
    }
  }

  doesPasswordNeedsToBeHashed(entity: Partial<User>) {
    if (!entity?.password?.trim()) return false;
    try {
      const { id, version, params, salt, hash } = deserialize(entity.password);
      return (
        id !== 'argon2id' ||
        !version ||
        !params?.m ||
        !params?.t ||
        !salt ||
        !hash
      );
    } catch {
      return true;
    }
  }
}

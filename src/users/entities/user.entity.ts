import { Report } from '../../reports/entities/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @AfterInsert()
  logInsert() {
    console.log('inserteted user ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('update user ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('remove user ', this.id);
  }

  //THIS DOESNOT CHANGE DATABASE STRUCTURE
  //BUT OTHER SIDE CHANGE THE DATABSE TABLE STRUCTUR
  //@MANYTOONE ADS USERID
  //THIS () => Report, IS BECAUSE OF CIRCULAT DEPENDENCIES
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}

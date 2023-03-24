import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class TinyUrl {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: string;

    @ManyToOne(() => User)
    user: User;

    @Column({
        nullable: false,
    })
    url: string;

    @Column({
        nullable: true,
        unique: true,
        type: 'varchar',
    })
    urlName?: string;
}

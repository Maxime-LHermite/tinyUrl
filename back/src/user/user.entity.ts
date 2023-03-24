import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    id: string;

    @Column({
        nullable: false,
    })
    username: string;

    @Column({
        nullable: false,
    })
    password: string;
}

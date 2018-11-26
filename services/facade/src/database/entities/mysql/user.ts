import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uuid: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    active: boolean;
    
    @Column({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'updated_at' })
    updateAt: Date;
}
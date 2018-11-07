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
    name: string;
    
    @Column()
    createdAt: Date;

    @Column()
    updateAt: Date;
}
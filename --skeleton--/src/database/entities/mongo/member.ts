import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";

@Entity({ name: "members"})
export class Member {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;
    
    @Column()
    createdAt: Date;

    @Column()
    updateAt: Date;
}
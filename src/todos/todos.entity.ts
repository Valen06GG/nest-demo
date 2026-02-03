import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({
    name: "todo",
})
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    isComplete: boolean;
}
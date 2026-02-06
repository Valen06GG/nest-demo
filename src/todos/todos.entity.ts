import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { File } from "./files.entity";

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

    @OneToMany(() => File, (file) => file.todo)
    files: File[];
}
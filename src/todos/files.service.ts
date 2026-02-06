import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from "./todos.entity";
import { File } from "./files.entity";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly filesRespository: Repository<File>,
  ) {}

  async saveFile({
    name,
    mimeType,
    data,
    todo,
  }: {
    name: string;
    mimeType: string;
    data: Buffer;
    todo: Todo | null; 
  }) {

    if (!todo) {
      throw new NotFoundException("Todo no encontrado");
    }

    const file = new File();
    file.name = name;
    file.mimeType = mimeType;
    file.data = data;
    file.todo = todo;

    return this.filesRespository.save(file);
  }
}
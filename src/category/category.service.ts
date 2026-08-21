import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  getname(): string {
    return 'i am category';
  }
}

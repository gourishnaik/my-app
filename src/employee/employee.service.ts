import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  heelloGourish(): string {
    return 'heello gourish';
  }
}

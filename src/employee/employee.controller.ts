import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('v1/hello') // GET /employee/v1/hello  (static subpath)
  getHeelloGourish(): string {
    return this.employeeService.heelloGourish();
  }
}

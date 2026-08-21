import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

   @Get('getname')
    getname(): string {
        return this.categoryService.getname();
    }

}


//without constructor we cannot use the service methods in controller. we need to inject the service in controller using constructor.
// import { Controller, Get } from '@nestjs/common';
// import { CategoryService } from './category.service';

// @Controller('category')
// export class CategoryController {

//   private categoryService = new CategoryService();

//   @Get('getname')
//   getname(): string {
//     return this.categoryService.getname();
//   }
// }
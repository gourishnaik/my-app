import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user') //usser path came here
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getshifali(): string {

    return this.userService.getshifali();
  }

  @Get('products') // GET /user/products  (static subpath)
  listProducts() {
    return this.userService.listProducts();
  }

  @Get('products/:id')                                   // maps this method to GET /user/products/:id
  getProductById(@Param('id', ParseIntPipe) id: number) { // @Param('id', ...) reads the ':id' URL segment, ParseIntPipe converts it 'string -> number', typed as number here
    return this.userService.getProductById(id);            // delegates to the service, which finds the product or throws NotFoundException
  }


  @Post('products')
  addProduct( @Body('name') name: string, @Body('price') price: number, ) {
    return this.userService.addProduct(name, price);
  }


  @Put('products/:id')
updateProduct(
  @Param('id', ParseIntPipe) id: number,
  @Body('name') name: string,
  @Body('price') price: number,
) {
  return this.userService.updateProduct(id, name, price);
}

@Delete('products/:id')
deleteProduct(@Param('id') id: string) {
  return this.userService.deleteProduct(Number(id));
}

 
}

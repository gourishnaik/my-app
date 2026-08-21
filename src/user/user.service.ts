import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  getshifali(): string {
    return 'i am shif';
  }


    callsinchana(): string {
      console.log('calling sinchana');
    return 'i am sinchana';
  }

  private products = [
    { id: 1, name: 'Laptop', price: 55000 },
    { id: 2, name: 'Phone', price: 20000 },
    { id: 3, name: 'Tablet', price: 15000 },
  ];

  listProducts() {
    return this.products;
  }

  getProductById(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  addProduct(name: string, price: number) {
  const newProduct = {
    id: this.products.length + 1,// Assign a new ID based on the current length of the products array
    name,// Use shorthand property names for name and   
    price,// use shorthand property names for name and price
  };

  this.products.push(newProduct);// Add the new product to the products array

  return newProduct;// Return the newly added product
}


updateProduct(id: number, name: string, price: number) {
  const product = this.products.find((p) => p.id === id);

  if (!product) {
    throw new NotFoundException(`Product ${id} not found`);
  }

  product.name = name;// Update the product's name with the new value
  product.price = price;//    update the product's price with the new value

  return product;
}



deleteProduct(id: number) {
  const productIndex = this.products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    throw new NotFoundException(`Product ${id} not found`);
  }

  const deletedProduct = this.products.splice(productIndex, 1);

  return deletedProduct[0];
}
// GET     /user/products       → Get all
// GET     /user/products/:id   → Get one
// POST    /user/products       → Create
// PUT     /user/products/:id   → Update

// other way to add product

// addProduct(product: { name: string; price: number }) {
//   const newProduct = {
//     id: this.products.length + 1,
//     ...product,
//   };

//   this.products = [...this.products, newProduct];

//   return newProduct;
// }



}

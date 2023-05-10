// const fs = require("fs");
import fs from "fs";

export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = "products.json";
    const dataStr = fs.readFileSync(this.path, "utf-8");
    const data = JSON.parse(dataStr);
    this.products = data;
  }

  addProduct = (product) => {
    if (product.id) {
      console.error("No se puede agregar el producto");
    } else {
      product.id = this.#generateId();
      this.products.push(product);
      const productStr = JSON.stringify(this.products);
      fs.writeFileSync(this.path, productStr);
    }
  };

  #generateId() {
    let idGenerated = 0;
    for (let i = 0; i < this.products.length; i++) {
      const newId = this.products[i];
      if (newId.id > idGenerated) {
        idGenerated = newId.id;
      }
    }
    return ++idGenerated;
  }

  getProduct() {
    return this.products;
  }

  getProductById(id) {
    const foundId = this.products.find((e) => e.id === id);

    if (foundId) {
      console.log(foundId);
      return foundId;
    } else {
      console.error("ERROR");
    }
  }

  updateProduct(productId, product) {
    const foundId = this.products.find((e) => e.id === productId);

    if (foundId) {
      if (product.id) {
        console.error("No se puede agregar el producto");
      } else {
        Object.assign(foundId, product);
        const productStr = JSON.stringify(this.products);
        fs.writeFileSync(this.path, productStr);
      }
    } else {
      console.error("ERROR");
    }
  }

  deleteProduct(id) {
    const validator = this.products.find((e) => e.id === id);
    const foundId = this.products.filter((product) => product.id !== id);
    if (validator) {
      const productStr = JSON.stringify(foundId);
      fs.writeFileSync(this.path, productStr);
    } else {
      console.error("ERROR");
    }
  }
}

// const productManager = new ProductManager();

// console.log(productManager.getProduct());

// productManager.addProduct({
//   title: "producto de prueba",
//   description: "Este es un producto de prueba",
//   price: 200,
//   thumbnail: "Sin imagen",
//   code: "abc123",
//   stock: 25,
// });

// productManager.addProduct({
//   title: "producto de prueba 2",
//   description: "Este es un producto de prueba 2",
//   price: 100,
//   thumbnail: "Sin imagen",
//   code: "abc124",
//   stock: 15,
// });

// productManager.addProduct({
//   title: "producto de prueba",
//   description: "Este es un producto de prueba",
//   price: 200,
//   thumbnail: "Sin imagen",
//   code: "abc123",
//   stock: 25,
//   id: 2,
// });

// console.log(productManager.getProduct());

// productManager.getProductById(1);
// productManager.getProductById(5);

// productManager.updateProduct(1, { title: "cambio" });
// productManager.updateProduct(1, { title: "otro titulo", id: 54 });

// console.log(productManager.getProduct());

// productManager.deleteProduct(1);
// productManager.deleteProduct(6);

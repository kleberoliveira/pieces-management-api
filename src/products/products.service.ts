import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/products.schema';
import { ProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: Record<string, any>): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async update(id: string, productDto: ProductDto): Promise<boolean> {
    const updateProduct: Product = productDto;
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProduct);
    return updatedProduct !== null;
  }

  async delete(id: string): Promise<boolean> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    return deletedProduct !== null;
  }

  async findOneById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}

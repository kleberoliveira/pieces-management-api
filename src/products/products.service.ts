import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/products.schema';
import { ProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  private logger: Logger;
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {
    this.logger = new Logger(ProductsService.name, true);
  }

  async create(createProductDto: ProductDto): Promise<Product> {
    try {
      this.logger.debug(`create product ${createProductDto.uuid}`);
      const createdProduct = this.productModel.create(createProductDto);
      return createdProduct;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async update(id: string, productDto: ProductDto): Promise<boolean> {
    try {
      this.logger.debug(`update product ${id}`);
      const updateProduct: Product = productDto;
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        updateProduct,
      );
      return updatedProduct !== null;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      this.logger.debug(`delete product ${id}`);
      const deletedProduct = await this.productModel.findByIdAndDelete(id);
      return deletedProduct !== null;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async findOneById(id: string): Promise<Product> {
    try {
      this.logger.debug(`findOne product ${id}`);
      return this.productModel.findById(id).exec();
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async findOneByCode(uuid: string): Promise<Product> {
    try {
      this.logger.debug(`findOneByCode product ${uuid}`);
      return this.productModel.findOne({ uuid }).exec();
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      this.logger.debug(`findAll products`);
      return this.productModel.find().exec();
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }
}

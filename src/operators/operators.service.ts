import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Operator, OperatorDocument } from './schemas/operator.schema';
import { OperatorDto } from './dto/operator.dto';

@Injectable()
export class OperatorsService {
  private logger: Logger;
  constructor(
    @InjectModel(Operator.name) private operatorModel: Model<OperatorDocument>,
  ) {
    this.logger = new Logger(OperatorsService.name, true);
  }

  async create(createOperatorDto: OperatorDto): Promise<Operator> {
    try {
      this.logger.debug(`create operator ${createOperatorDto.name}`);
      const createdOperator = this.operatorModel.create(createOperatorDto);
      return createdOperator;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async update(id: string, operatorDto: OperatorDto): Promise<boolean> {
    try {
      this.logger.debug(`update operator ${id}`);
      const updateOperator: Operator = operatorDto;
      const updatedOperator = await this.operatorModel.findByIdAndUpdate(
        id,
        updateOperator,
      );
      return updatedOperator !== null;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      this.logger.debug(`delete operator ${id}`);
      const deletedOperator = await this.operatorModel.findByIdAndDelete(id);
      return deletedOperator !== null;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async findOneById(id: string): Promise<Operator> {
    try {
      this.logger.debug(`findOne operator ${id}`);
      return this.operatorModel.findById(id).exec();
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async findAll(): Promise<Operator[]> {
    try {
      this.logger.debug(`findAll operators`);
      return this.operatorModel.find().exec();
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }
}

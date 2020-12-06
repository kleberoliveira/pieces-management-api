import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Operator, OperatorDocument } from './schemas/operator.schema';
import { OperatorDto } from './dto/operator.dto';

@Injectable()
export class OperatorsService {
  constructor(
    @InjectModel(Operator.name) private operatorModel: Model<OperatorDocument>,
  ) {}

  async create(createOperatorDto: OperatorDto): Promise<Operator> {
    const createdOperator = this.operatorModel.create(createOperatorDto);
    return createdOperator;
  }

  async update(id: string, operatorDto: OperatorDto): Promise<boolean> {
    const updateOperator: Operator = operatorDto;
    const updatedOperator = await this.operatorModel.findByIdAndUpdate(
      id,
      updateOperator,
    );
    return updatedOperator !== null;
  }

  async delete(id: string): Promise<boolean> {
    const deletedOperator = await this.operatorModel.findByIdAndDelete(id);
    return deletedOperator !== null;
  }

  async findOneById(id: string): Promise<Operator> {
    return this.operatorModel.findById(id).exec();
  }

  async findAll(): Promise<Operator[]> {
    return this.operatorModel.find().exec();
  }
}

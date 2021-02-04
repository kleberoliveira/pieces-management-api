import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History, HistoryDocument } from './schemas/history.schema';
import { HistoryDto } from './dto/history.dto';
import { Place } from 'src/places/schemas/place.schema';
import { Operator } from 'src/operators/schemas/operator.schema';
import { Product } from 'src/products/schemas/products.schema';

@Injectable()
export class HistoriesService {
  private logger: Logger;
  constructor(
    @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
  ) {
    this.logger = new Logger(HistoriesService.name, true);
  }

  async create(createHistoryDto: HistoryDto): Promise<History> {
    try {
      this.logger.debug(`create history ${createHistoryDto.history}`);
      const createdHistory = this.historyModel.create(createHistoryDto);
      return createdHistory;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async update(id: string, historyDto: HistoryDto): Promise<boolean> {
    try {
      this.logger.debug(`update history ${id}`);
      const updateHistory: History = historyDto;
      const updatedHistory = await this.historyModel.findByIdAndUpdate(
        id,
        updateHistory,
      );
      return updatedHistory !== null;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      this.logger.debug(`delete history ${id}`);
      const deletedHistory = await this.historyModel.findByIdAndDelete(id);
      return deletedHistory !== null;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async findOneById(id: string): Promise<History> {
    try {
      this.logger.debug(`findOne history ${id}`);
      return this.historyModel.findById(id).exec();
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async findAll(): Promise<History[]> {
    try {
      this.logger.debug(`findAll histories`);
      return this.historyModel
        .find()
        .populate('place', null, Place)
        .populate('operator', null, Operator)
        .populate('product', null, Product)
        .exec();
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }
}

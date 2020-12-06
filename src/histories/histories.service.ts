import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History, HistoryDocument } from './schemas/history.schema';
import { HistoryDto } from './dto/history.dto';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
  ) {}

  async create(createHistoryDto: HistoryDto): Promise<History> {
    const createdHistory = this.historyModel.create(createHistoryDto);
    return createdHistory;
  }

  async update(id: string, historyDto: HistoryDto): Promise<boolean> {
    const updateHistory: History = historyDto;
    const updatedHistory = await this.historyModel.findByIdAndUpdate(
      id,
      updateHistory,
    );
    return updatedHistory !== null;
  }

  async delete(id: string): Promise<boolean> {
    const deletedHistory = await this.historyModel.findByIdAndDelete(id);
    return deletedHistory !== null;
  }

  async findOneById(id: string): Promise<History> {
    return this.historyModel.findById(id).exec();
  }

  async findAll(): Promise<History[]> {
    return this.historyModel.find().exec();
  }
}

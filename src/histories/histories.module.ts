import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { History, HistorySchema } from './schemas/history.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    ProductsModule
  ],
  providers: [HistoriesService],
  controllers: [HistoriesController],
})
export class HistoriesModule {}

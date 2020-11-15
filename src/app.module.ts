import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoriesModule } from './histories/histories.module';
import { OperatorsModule } from './operators/operators.module';
import { PlacesModule } from './places/places.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/pieces-management'),
    UsersModule,
    PlacesModule,
    OperatorsModule,
    HistoriesModule,
    ProductsModule
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoriesModule } from './histories/histories.module';
import { OperatorsModule } from './operators/operators.module';
import { PlacesModule } from './places/places.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import validationSchema from './validation/env.schema';
import * as config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: Object.values(config),
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>(
          'db.host',
        )}:${configService.get<string>('db.port')}/${configService.get<string>(
          'db.name',
        )}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
    }),
    UsersModule,
    PlacesModule,
    OperatorsModule,
    HistoriesModule,
    ProductsModule,
    AuthModule,
  ],
})
export class AppModule {}

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place, PlaceDocument } from './schemas/place.schema';
import { PlaceDto } from './dto/place.dto';

@Injectable()
export class PlacesService {
  private logger: Logger;
  constructor(
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
  ) {
    this.logger = new Logger(PlacesService.name, true);
  }

  async create(createPlaceDto: PlaceDto): Promise<Place> {
    try {
      this.logger.debug(`create place ${createPlaceDto.name}`);
      const createdPlace = this.placeModel.create(createPlaceDto);
      return createdPlace;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async update(id: string, placeDto: PlaceDto): Promise<boolean> {
    try {
      this.logger.debug(`update place ${id}`);
      const updatePlace: Place = placeDto;
      const updatedPlace = await this.placeModel.findByIdAndUpdate(
        id,
        updatePlace,
      );
      return updatedPlace !== null;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      this.logger.debug(`delete place ${id}`);
      const deletedPlace = await this.placeModel.findByIdAndDelete(id);
      return deletedPlace !== null;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async findOneById(id: string): Promise<Place> {
    try {
      this.logger.debug(`findOne place ${id}`);
      return this.placeModel.findById(id).exec();
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async findAll(): Promise<Place[]> {
    try {
      this.logger.debug(`findAll places`);
      return this.placeModel.find().exec();
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }
}

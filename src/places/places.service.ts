import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place, PlaceDocument } from './schemas/place.schema';
import { PlaceDto } from './dto/place.dto';

@Injectable()
export class PlacesService {
  constructor(@InjectModel(Place.name) private placeModel: Model<PlaceDocument>) {}

  async create(createPlaceDto: Record<string, any>): Promise<Place> {
    const createdPlace = new this.placeModel(createPlaceDto);
    return createdPlace.save();
  }

  async update(id: string, placeDto: PlaceDto): Promise<boolean> {
    const updatePlace: Place = placeDto;
    const updatedPlace = await this.placeModel.findByIdAndUpdate(id, updatePlace);
    return updatedPlace !== null;
  }

  async delete(id: string): Promise<boolean> {
    const deletedPlace = await this.placeModel.findByIdAndDelete(id);
    return deletedPlace !== null;
  }

  async findOneById(id: string): Promise<Place> {
    return this.placeModel.findById(id).exec();
  }

  async findAll(): Promise<Place[]> {
    return this.placeModel.find().exec();
  }
}

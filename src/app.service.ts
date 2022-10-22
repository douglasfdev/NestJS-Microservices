import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categorias/categoria.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
  ) {}

  private readonly logger = new Logger(AppService.name);

  async criarCategoria(categoria: Categoria): Promise<void> {
    try {
      const categoriaCriada = new this.categoriaModel(categoria);
      await categoriaCriada.save(); //removido o return
    } catch (e) {
      this.logger.error(`error: ${JSON.stringify(e.message)}`);
      throw new RpcException(e.message);
    }
  }

  async consultarTodasCategorias(): Promise<Categoria[]> {
    try {
      return await this.categoriaModel.find().exec();
    } catch (e) {
      this.logger.error(`error: ${JSON.stringify(e.message)}`);
      throw new RpcException(e.message);
    }
  }

  async consultarCategoriaPeloId(_id: string): Promise<Categoria> {
    try {
      return await this.categoriaModel.findOne({ _id }).exec();
    } catch (e) {
      this.logger.error(`error: ${JSON.stringify(e.message)}`);
      throw new RpcException(e.message);
    }
  }

  async atualizarCategoria(_id: string, categoria: Categoria): Promise<void> {
    try {
      await this.categoriaModel
        .findOneAndUpdate({ _id }, { $set: categoria })
        .exec();
    } catch (e) {
      this.logger.error(`error: ${JSON.stringify(e.message)}`);
      throw new RpcException(e.message);
    }
  }
}

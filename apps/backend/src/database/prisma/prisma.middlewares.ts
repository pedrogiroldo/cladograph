import { HttpException, HttpStatus } from '@nestjs/common';

export default class PrismaMiddlewares {
  constructor() {
    this.excludePassword = this.excludePassword.bind(this);
    this.blockFields = this.blockFields.bind(this);
    this.blockId = this.blockId.bind(this);
    this.blockCreatedAt = this.blockCreatedAt.bind(this);
    this.blockUpdatedAt = this.blockUpdatedAt.bind(this);
  }

  public async excludePassword(params, next) {
    const result = await next(params);
    if (params?.model === 'User' && params?.args?.select?.password !== true) {
      delete result.password;
    }
    return result;
  }

  public async blockFields(params, next) {
    if (params.action === 'update' || params.action === 'create') {
      try {
        this.blockId(params);
        this.blockCreatedAt(params);
        this.blockUpdatedAt(params);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      return next(params);
    }
  }

  private blockId(params) {
    if (params.args.data.id) {
      throw new Error('Atualizar o ID do usuário não é permitido');
    }
  }

  private blockCreatedAt(params) {
    if (params.args.data.createdAt) {
      throw new Error('Atualizar o createdAt do usuário não é permitido');
    }
  }

  private blockUpdatedAt(params) {
    if (params.args.data.updatedAt) {
      throw new Error('Atualizar o updatedAt do usuário não é permitido');
    }
  }
}

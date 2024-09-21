import { ConflictException, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { query } from 'express';
import { Client } from 'pg';

@Injectable()
export class PgService implements OnModuleInit, OnModuleDestroy {
  #_client: Client;

  constructor() {
    this.#_client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '1234',
      database: 'moviesite',
    });
  }

  async fetchData(query: string, ...params: any[]): Promise<any> {
    try {
      const { rows } = await this.#_client.query(query, params);
      return rows
    } catch (error) {
      throw new ConflictException('Db error');
    }
  }

  async onModuleInit() {
      await this.#_client.connect()
      console.log("Connected to the database...")
  }

  async onModuleDestroy() {
      await this.#_client.end()
      console.log("Disconnected from the database...")
  }
}

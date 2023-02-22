import type { Knex } from 'knex'

interface Reader<T> {
  find(item: Partial<T>): Promise<T[]>
}

type BaseRepository<T> = Reader<T>

export abstract class KnexRepository<T> implements BaseRepository<T> {
  constructor(
    public readonly knex: Knex,
    public readonly tableName: string,
  ) {}

  // Shortcut for Query Builder call
  public get qb(): Knex.QueryBuilder {
    return this.knex(this.tableName)
  }

  find(item: Partial<T>): Promise<T[]> {
    return this.qb
      .where(item)
      .select()
  }
}

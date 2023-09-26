import { MongoClient } from 'mongodb'

export const MongoHelper = {
  connection: null as unknown as MongoClient,
  async connect (uri: string): Promise<void> {
    this.connection = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.connection.close()
  }
}
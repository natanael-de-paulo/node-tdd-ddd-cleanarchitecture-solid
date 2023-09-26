import { MongoClient, Collection, WithId } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map<I, O> (collection: I): O {
    const { _id, ...collectionWithoutId } = collection as WithId<Document> & Omit<O, 'id'>
    return Object.assign({}, { ...collectionWithoutId }, { id: String(_id) }) as O
  }
}

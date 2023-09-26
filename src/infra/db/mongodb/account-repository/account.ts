import { Document, WithId } from 'mongodb'
import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    const result: Document = await accountCollection.findOne({ _id: insertedId }) as WithId<Document>
    const { _id, ...rest } = result as Document & Omit<AccountModel, 'id'>

    return Object.assign({}, { ...rest }, { id: _id })
  }
}

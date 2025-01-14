import { LoadSurveysRepository } from "@/data/protocols/db/survey/load-surveys-repository";
import { AddSurveyRepository } from "@/data/usecases/add-survey/add-survey-protocols";
import { SurveyModel } from "@/domain/models/survey";
import { AddSurveyModel } from "@/domain/usecases/add-survey"
import { MongoHelper } from "../helpers/mongo-helper";
import { LoadSurveyByIdRepository } from "@/data/usecases/load-survey-by-id/db-load-survey-by-id-protocols";
import { ObjectId } from "mongodb";

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return surveys.map(MongoHelper.map)
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({
      _id: new ObjectId(id)
    })
    return survey && MongoHelper.map(survey)
  }
}
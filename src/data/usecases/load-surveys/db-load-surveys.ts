import { SurveyModel } from "../../../domain/models/survey"
import { LoadSurveys } from "../../../domain/usecases/load-surveys"
import { LoadSurveysRepository } from "../../protocols/db/survey/load-surveys-repository"

export class DbLoadSurveys implements LoadSurveys {
  constructor(
    private loadSurveysRepository: LoadSurveysRepository
  ){}

  async load(): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
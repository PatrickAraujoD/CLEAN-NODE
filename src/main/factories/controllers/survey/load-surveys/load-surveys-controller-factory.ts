import { LoadSurveysController } from "@/presentation/controllers/survey/load-survey/load-surveys-controller";
import { Controller } from "@/presentation/protocols";
import { makeLogControllerDecorator } from "@/main/factories/decoractors/log-controller-decorator-factory";
import { makeDbLoadSurveys } from "@/main/factories/usecases/survey/load-surveys/db-load-surveys-factory";

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
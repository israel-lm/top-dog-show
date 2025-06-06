import { UseCases } from "../models/constants";

export interface IFrameworkAdapter {
  execute(useCaseId: UseCases, requestData: {}): Promise<{}>;
}

import { UseCases } from "../constants";

export interface IFrameworkAdapter {
  execute(useCaseId: UseCases, requestData: {}): Promise<{}>;
}

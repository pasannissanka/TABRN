import { Request, Response } from 'express';
import { AppError } from '../helpers/errors/app_error';
import { successResponse } from '../helpers/responses/success_response';
import { ViewModel } from '../modules/workspace-view/model/view.model';
import { ViewReqData } from '../modules/workspace-view/types/view.type';
import { WorkspaceModel } from '../modules/workspace/model/workspace.model';

class ViewController {
  public async createView(req: Request, res: Response) {
    const user = req.user;
    const data = req.body as ViewReqData;
    const { workspaceId } = req.params;

    const workspaceData = await WorkspaceModel.findById(workspaceId);
    if (!workspaceData) {
      throw new AppError('Invalid Workspace', 404);
    }

    const view = new ViewModel({
      userId: user?.id,
      workspaceId: workspaceId,
      type: data.type,
      entryKind: data.entryKind,
      title: data.title,
      description: data.description,
    });

    await view.save();

    successResponse(res, view);
  }

  public async getViews(req: Request, res: Response) {
    const user = req.user;
    const { workspaceId } = req.params;
  }

  public async getView(req: Request, res: Response) {}
}

export default new ViewController();

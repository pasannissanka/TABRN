import { Request, Response } from 'express';
import { AppError } from '../helpers/errors/app_error';
import { successResponse } from '../helpers/responses/success_response';
import { CalenderViewModel } from '../modules/workspace-view/model/calenderView.model';
import { ListViewModel } from '../modules/workspace-view/model/listView.model';
import { CalenderReqData } from '../modules/workspace-view/types/calenderView.type';
import { ListViewReqData } from '../modules/workspace-view/types/listView.type';
import { WorkspaceModel } from '../modules/workspace/model/workspace.model';

class ViewController {
  public async createViewListView(req: Request, res: Response) {
    const user = req.user;
    const data = req.body as ListViewReqData;
    const { workspaceId } = req.params;

    const workspaceData = await WorkspaceModel.findById(workspaceId);
    if (!workspaceData) {
      throw new AppError('Invalid Workspace', 404);
    }

    const view = new ListViewModel({
      userId: user?.id,
      workspaceId: workspaceId,
      title: data.title,
      description: data.description,
      filterProperties: data?.filterProperties,
    });

    await view.save();

    successResponse(res, view);
  }

  public async createViewCalender(req: Request, res: Response) {
    const user = req.user;
    const data = req.body as CalenderReqData;
    const { workspaceId } = req.params;

    const workspaceData = await WorkspaceModel.findById(workspaceId);
    if (!workspaceData) {
      throw new AppError('Invalid Workspace', 404);
    }

    const view = new CalenderViewModel({
      userId: user?.id,
      workspaceId: workspaceId,
      title: data.title,
      description: data.description,
      dateFormat: data.dateFormat,
      timeFormat: data.timeFormat,
      primaryTZ: data.primaryTZ,
      secondaryTZ: data.secondaryTZ,
      weekStart: data.weekStart,
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

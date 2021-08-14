import { Request, Response } from 'express';
import { successResponse } from '../helpers/responses/success_response';
import { WorkspaceModel } from '../modules/workspace/model/workspace.model';
import { IWorkspace } from '../modules/workspace/types/workspace.type';

class WorkspaceController {
  public async createNewWorkspace(req: Request, res: Response) {
    const user = req.user;
    const data: IWorkspace = req.body;

    const emoji = data.emoji;

    const workspace = new WorkspaceModel({
      userId: user?.id,
      title: data.title,
      description: data.description,
      emoji: emoji,
    });

    await workspace.save();

    successResponse(res, workspace);
  }

  public async getWorkspace(req: Request, res: Response) {
    const user = req.user;
    const slug = req.params.slug;

    const workspace = await WorkspaceModel.findOne({
      userId: user?.id,
      slug: slug,
      isDeleted: false,
    });

    if (!workspace) {
      successResponse(res, {});
    }

    successResponse(res, workspace);
  }

  public async getAllWorkspaces(req: Request, res: Response) {
    const user = req.user;

    const workspaces = await WorkspaceModel.find({
      userId: user?.id,
      isDeleted: false,
    });

    successResponse(res, workspaces);
  }

  public async updateWorkspace(req: Request, res: Response) {
    const user = req.user;
    const data: IWorkspace = req.body;
    const id = req.params.workspaceId;

    const workspace = await WorkspaceModel.findOneAndUpdate(
      {
        userId: user?.id,
        isDeleted: false,
        _id: id,
      },
      {
        title: data.title,
        description: data.description,
        emoji: data.emoji,
      },
      {
        new: true,
      }
    );

    if (!workspace) {
      return successResponse(res, {
        message: 'Not found',
      });
    }

    successResponse(res, workspace);
  }

  public async deleteWorkspace(req: Request, res: Response) {
    const user = req.user;
    const id = req.params.workspaceId;

    const workspace = await WorkspaceModel.findOneAndUpdate(
      {
        userId: user?.id,
        isDeleted: false,
        _id: id,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );

    if (!workspace) {
      return successResponse(res, {});
    }

    successResponse(res, workspace);
  }

  public async restoreWorkspace(req: Request, res: Response) {
    const user = req.user;
    const id = req.params.workspaceId;

    const workspace = await WorkspaceModel.findOneAndUpdate(
      {
        userId: user?.id,
        isDeleted: false,
        _id: id,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );

    if (!workspace) {
      return successResponse(res, {});
    }

    successResponse(res, workspace);
  }
}

export default new WorkspaceController();

import { Request, Response } from 'express';
import { successResponse } from '../helpers/responses/success_response';
import { TagModel } from '../modules/tags/model/tag.model';
import { WorkspaceModel } from '../modules/workspace/model/workspace.model';

class ExtensionController {
  public async getWorkspacesTagsKeyValue(req: Request, res: Response) {
    const user = req.user;

    const dataWorkspaces = await WorkspaceModel.find({
      userId: user?.id,
      isDeleted: false,
    }).sort({ updatedAt: -1 });

    const dataTags = await TagModel.find({
      userId: user?.id,
    }).sort({ updatedAt: -1 });

    const workspaces = dataWorkspaces.map((workspace) => {
      return {
        key: workspace.id,
        value: workspace.title,
        slug: workspace.slug,
      };
    });

    const tags = dataTags.map((tag) => {
      return {
        key: tag.id,
        value: tag.title,
        slug: tag.slug,
      };
    });

    successResponse(res, {
      workspaces,
      tags,
    });
  }
}

export default new ExtensionController();

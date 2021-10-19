import { Request, Response } from 'express';
import { AppError } from '../helpers/errors/app_error';
import { parseBookmarkDetails } from '../helpers/markdown/parseBookmarkContent';
import { successResponse } from '../helpers/responses/success_response';
import { CollectionModel } from '../modules/collection/model/collection.model';
import { ExtensionReqBody } from '../modules/entry/types/entry.type';
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
        value: workspace.slug,
        title: workspace.title,
      };
    });

    const tags = dataTags.map((tag) => {
      return {
        key: tag.id,
        value: tag.slug,
        title: tag.title,
      };
    });

    successResponse(res, {
      workspaces,
      tags,
    });
  }

  public async getViewsAsKeyValue(req: Request, res: Response) {
    const user = req.user;
    const { workspace_id } = req.params;

    const collectionsData = await CollectionModel.find({
      userId: user?.id,
      workspaceId: workspace_id,
      isDeleted: false,
    });

    const views = collectionsData.map((view) => {
      return {
        key: view.id,
        value: view.slug,
        title: view.title,
      };
    });

    successResponse(res, {
      views,
    });
  }

  public async createBookmark(req: Request, res: Response) {
    // const user = req.user;
    const data = req.body as ExtensionReqBody;

    const bookmarkDetails = parseBookmarkDetails(data.content);
    console.log(bookmarkDetails);

    const workspaceData = await WorkspaceModel.findById(data.workspaceId);
    if (!workspaceData) {
      throw new AppError('Invalid Workspace', 404);
    }

    // const usersTags = await TagModel.find({
    //   userId: user?.id,
    //   title: {
    //     $in: [...bookmarkDetails.tags],
    //   },
    // }).exec();

    // let newTags: Tag[] = [];
    // if (usersTags.length !== bookmarkDetails.tags.length) {
    //   const difference = bookmarkDetails.tags.filter(
    //     (tag) => !usersTags.some((v) => v.title === tag)
    //   );

    //   const tagData: ITag[] = difference.map((tag: any) => {
    //     return {
    //       userId: user?.id,
    //       title: tag,
    //     };
    //   });
    //   newTags = await TagModel.insertMany(tagData);
    // }

    // if (bookmarkDetails.title === '') {
    //   const idx = await BookmarkModel.count({
    //     userId: user?.id,
    //     workspaceId: workspaceData.id,
    //     title: /Untitled/,
    //     isDeleted: false,
    //   }).exec();
    //   const cStr = idx === 0 ? '' : ` ${idx}`;
    //   bookmarkDetails.title = `Untitled${cStr}`;
    // }

    // const tagIds = [...usersTags, ...newTags].map((tag) => tag.id);

    // const view = await ViewModel.find({
    //   userId: user?.id,
    //   workspaceId: data.workspaceId,
    //   slug: bookmarkDetails.workspace_views[0],
    // }).exec();

    // const bookmarkData: IBookmark = {
    //   userId: user?.id,
    //   workspaceId: workspaceData.id,
    //   tags: tagIds,
    //   title: bookmarkDetails.title,
    //   description: bookmarkDetails.description,
    //   url: data.url,
    //   viewId: view[0].id,
    //   linkData: {
    //     faviconUrl: data.linkData.faviconUrl,
    //     hostname: data.linkData.hostname,
    //     title: data.linkData.title,
    //   },
    // };

    // console.log(bookmarkData);

    // const bookmark = new BookmarkModel(bookmarkData);
    // await bookmark.save();

    successResponse(res, {
      error: 'NOT IMPLEMENTED',
    });
  }
}

export default new ExtensionController();

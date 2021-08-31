import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { AppError } from '../helpers/errors/app_error';
import { parseBookmarkDetails } from '../helpers/markdown/parseBookmarkContent';
import { successResponse } from '../helpers/responses/success_response';
import { TagModel } from '../modules/tags/model/tag.model';
import { ITag, Tag } from '../modules/tags/types/tag.type';
import { BookmarkModel } from '../modules/workspace-entry/model/bookmark.model';
import {
  Bookmark,
  BookmarkReqBody,
  BookmarkUpdateBody,
  IBookmark,
} from '../modules/workspace-entry/types/bookmark.type';
import { WorkspaceModel } from '../modules/workspace/model/workspace.model';

class BookmarkController {
  public async addBookmark(req: Request, res: Response) {
    const user = req.user;
    const data = req.body as BookmarkReqBody;

    const workspaceData = await WorkspaceModel.findById(data.workspaceId);
    if (!workspaceData) {
      throw new AppError('Invalid Workspace', 404);
    }

    const bookmarkDetails = parseBookmarkDetails(data.content);

    const usersTags = await TagModel.find({
      userId: user?.id,
      title: {
        $in: [...bookmarkDetails.tags],
      },
    }).exec();

    let newTags: Tag[] = [];
    if (usersTags.length !== bookmarkDetails.tags.length) {
      const difference = bookmarkDetails.tags.filter(
        (tag) => !usersTags.some((v) => v.title === tag)
      );

      const tagData: ITag[] = difference.map((tag) => {
        return {
          userId: user?.id,
          title: tag,
        };
      });
      newTags = await TagModel.insertMany(tagData);
    }

    const tagIds = [...usersTags, ...newTags].map((tag) => tag.id);

    if (bookmarkDetails.title === '') {
      const idx = await BookmarkModel.count({
        userId: user?.id,
        workspaceId: workspaceData.id,
        title: /Untitled/,
        isDeleted: false,
      }).exec();
      const cStr = idx === 0 ? '' : ` ${idx}`;
      bookmarkDetails.title = `Untitled${cStr}`;
    }

    // const bookmarkData: IBookmark = {
    //   userId: user?.id,
    //   workspaceId: workspaceData.id,
    //   tags: tagIds,
    //   title: bookmarkDetails.title,
    //   description: bookmarkDetails.description,
    //   url: data.url,
    //   linkData: {
    //     faviconUrl: data.linkData.faviconUrl,
    //     hostname: data.linkData.hostname,
    //     title: data.linkData.title,
    //   },
    // };

    // const bookmark = new BookmarkModel(bookmarkData);
    // await bookmark.save();

    successResponse(res, {});
  }

  public async paginate(req: Request, res: Response) {
    const user = req.user;
    const page = parseInt(req.query.page as string, 10);
    const limit = parseInt(req.query.limit as string, 10);
    const { workspaceId } = req.params;

    const query = {
      userId: user?.id,
      workspaceId: workspaceId,
      isDeleted: false,
    };

    const bookmarks = await BookmarkModel.find(query)
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await BookmarkModel.count(query).exec();

    successResponse(res, {
      count,
      page,
      limit,
      data: bookmarks,
    });
  }

  public async getBookmark(req: Request, res: Response) {
    const user = req.user;
    const { bookmarkSlug, workspaceId } = req.params;

    const bookmark = await BookmarkModel.findOne({
      userId: user?.id,
      isDeleted: false,
      slug: bookmarkSlug,
      workspaceId: workspaceId,
    });

    successResponse(res, bookmark);
  }

  public async updateBookmark(req: Request, res: Response) {
    const user = req.user;
    const { bookmarkId } = req.params;
    const data = req.body as BookmarkUpdateBody;

    const bookmarkOrg = await BookmarkModel.aggregate<Bookmark>([
      {
        $match: {
          _id: Types.ObjectId(bookmarkId),
          userId: Types.ObjectId(user?.id),
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags',
        },
      },
    ]);

    // Check if tags are changed
    // New tags are added
    const tagDifferenceAddition = data.tags.filter(
      (tag) => !bookmarkOrg[0].tags.some((v) => (v as Tag).title === tag)
    );
    // Tags removed
    const tagDifferencePop = (bookmarkOrg[0].tags as Tag[]).filter(
      (tag) => !data.tags.some((v) => tag.title === v)
    );

    // Handle tag addition
    let newTags: Tag[] = [];
    if (tagDifferenceAddition.length > 0) {
      // Exisisting tag?
      const usersTags = await TagModel.find({
        userId: user?.id,
        title: {
          $in: [...tagDifferenceAddition],
        },
      }).exec();

      if (usersTags.length !== tagDifferenceAddition.length) {
        const difference = tagDifferenceAddition.filter(
          (tag) => !usersTags.some((v) => v.title === tag)
        );

        const tagData: ITag[] = difference.map((tag) => {
          return {
            userId: user?.id,
            title: tag,
          };
        });
        newTags = await TagModel.insertMany(tagData);
      } else {
        newTags = usersTags;
      }
    }

    // Handle tag remove
    if (tagDifferencePop.length > 0) {
      bookmarkOrg[0].tags = (bookmarkOrg[0].tags as Tag[]).filter(
        (tag) => !tagDifferencePop.some((v) => v._id === tag._id)
      );
    }

    const tags: string[] = [...bookmarkOrg[0].tags, ...newTags].map(
      (tag) => (tag as Tag)._id
    );

    const updatedData = {
      title: data?.title,
      description: data?.description,
      url: data?.url,
    };

    const bookmarkData: any = {
      ...bookmarkOrg[0],
      tags: tags,
      ...updatedData,
    };

    const bookmark = await BookmarkModel.findByIdAndUpdate(
      bookmarkData._id,
      bookmarkData,
      {
        new: true,
      }
    ).exec();

    successResponse(res, bookmark);
  }

  public async deleteBookmark(req: Request, res: Response) {
    const user = req.user;
    const { bookmarkId } = req.params;

    const bookmark = await BookmarkModel.findOneAndUpdate(
      {
        userId: user?.id,
        isDeleted: false,
        _id: bookmarkId,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );

    successResponse(res, bookmark);
  }
}

export default new BookmarkController();

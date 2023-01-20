import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UserService } from 'src/user/user.service';
import { QueryDTO } from './dto/query.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDTO: CreatePostDTO, @Request() req) {
    try {
      const { id: userId } = req.user;
      const post = await this.postService.create(createPostDTO, userId);

      return {
        success: true,
        message: 'Successfully Create Post',
        data: post,
      };
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Body() createPostDTO: CreatePostDTO,
    @Request() req,
    @Param('id') postId: number,
  ) {
    try {
      const { id: userId } = req.user;
      const post = await this.postService.update(createPostDTO, userId, postId);

      return {
        success: true,
        message: 'Successfully Update Post',
        data: post,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') postId: number, @Request() req) {
    try {
      const { id: userId } = req.user;
      await this.postService.delete(postId, userId);

      return {
        success: true,
        message: 'Successfully Delete Post',
        data: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Put('/like/:id')
  async like(@Param('id') postId: number, @Request() req) {
    try {
      const { id: userId } = req.user;
      await this.postService.like(postId, userId);

      return {
        success: true,
        message: 'Successfully Liked Post',
        data: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Put('/unlike/:id')
  async unLike(@Param('id') postId: number, @Request() req) {
    try {
      const { id: userId } = req.user;
      await this.postService.unLike(postId, userId);

      return {
        success: true,
        message: 'Successfully Unlike Post',
        data: null,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAll(@Query() query: QueryDTO) {
    try {
      const { page, limit, searchBy, search } = query;
      const take = Number(limit) || 20;
      const skip = Number((page - 1) * take);

      const posts = await this.postService.getAll({
        take,
        skip,
        searchBy,
        search,
      });

      return {
        success: true,
        message: 'Successfully Get Post',
        data: posts,
      };
    } catch (error) {
      throw error;
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { QueryDTO } from './dto/query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { ApiTags } from '@nestjs/swagger';

@Controller('post')
@ApiTags('Post')
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
  async getAll(@Query() query: QueryDTO, @Request() req) {
    try {
      const { page, limit, searchBy, search } = query;
      const take = Number(limit) || 20;
      const skip = Number((page - 1) * take);
      const { id: userId } = req.user;

      const { rows, count } = await this.postService.getAll({
        take,
        skip,
        searchBy,
        search,
        userId,
        isOwnPost: false,
      });

      return {
        success: true,
        message: 'Successfully Get Post',
        data: rows,
        pagination: {
          total: count,
          page,
          limit,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getOne(@Param('id') postId: number) {
    try {
      const post = await this.postService.getById(postId);
      return {
        success: true,
        message: 'Successfully Get Post',
        data: post,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/user/:id')
  async getAllByUser(@Query() query: QueryDTO, @Param('id') userId: number) {
    try {
      const { page, limit, searchBy, search } = query;
      const take = Number(limit) || 20;
      const skip = Number((page - 1) * take);

      const { rows, count } = await this.postService.getAll({
        take,
        skip,
        searchBy,
        search,
        userId,
        isOwnPost: true,
      });

      return {
        success: true,
        message: 'Successfully Get Post',
        data: rows,
        pagination: {
          total: count,
          page,
          limit,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
        filename(req, file, callback) {
          callback(null, `${Date.now()}.png`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }), //1MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const dirUploads = path.join(__dirname, '../../uploads');
    const filepath = `${dirUploads}/${file.filename}`;
    const renamefile = `${Date.now()}.png`;
    await sharp(filepath)
      .resize(600, 600)
      .png({ effort: 3, quality: 100 })
      .toFile(`${dirUploads}/${renamefile}`);

    fs.unlinkSync(filepath);

    const apiUrl = process.env.API_URL || 'http://localhost:9001';
    return {
      succes: true,
      message: 'File succesfully uploaded',
      data: {
        link: `${apiUrl}/uploads/${renamefile}`,
      },
    };
  }
}

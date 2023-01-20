import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  findById(id: number) {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  async create(createPostDTO: CreatePostDTO, userId: number) {
    try {
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('Data not found');
      }

      const { caption, image, tags } = createPostDTO;
      const {
        id,
        userId: x,
        ...post
      } = await this.prismaService.post.create({
        data: { caption, image, tags, userId: user.id },
      });

      return {
        ...post,
        user: {
          name: user.name,
          email: user.email,
          photo: user.photo,
          username: user.username,
        },
      };
    } catch (error) {
      throw error();
    }
  }

  async update(updatePostDTO: UpdatePostDTO, userId: number, postId: number) {
    try {
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('Data not found');
      }

      const post = await this.findById(postId);
      if (!post || post.userId !== user.id) {
        throw new NotFoundException('Data not found');
      }

      const { caption, image, tags } = updatePostDTO;
      const {
        id,
        userId: x,
        ...updatePost
      } = await this.prismaService.post.update({
        where: { id: postId },
        data: { caption, image, tags },
      });

      return {
        ...updatePost,
        user: {
          name: user.name,
          email: user.email,
          photo: user.photo,
          username: user.username,
        },
      };
    } catch (error) {
      throw error();
    }
  }

  async delete(postId: number, userId: number) {
    try {
      const post = await this.findById(postId);
      if (!post || post?.userId !== userId) {
        throw new NotFoundException('Data not found');
      }
      await this.prismaService.post.delete({ where: { id: postId } });
    } catch (error) {
      throw error;
    }
  }

  async like(postId: number, userId: number) {
    try {
      const post = await this.findById(postId);
      if (!post) {
        throw new NotFoundException('Data not found');
      }

      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('Data not found');
      }

      await this.prismaService.userLiked.create({ data: { userId, postId } });
      await this.prismaService.post.update({
        where: { id: postId },
        data: {
          likes: post.likes + 1,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async unLike(postId: number, userId: number) {
    try {
      const post = await this.findById(postId);
      if (!post) {
        throw new NotFoundException('Data not found');
      }

      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('Data not found');
      }

      await this.prismaService.userLiked.delete({
        where: { postId_userId: { userId, postId } },
      });

      await this.prismaService.post.update({
        where: { id: postId },
        data: {
          likes: post.likes - 1,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAll({ take, skip, searchBy, search, userId }) {
    try {
      let where = {};
      if (userId) {
        where = {
          ...where,
          userId,
        };
      }
      if (search && searchBy) {
        const col = searchBy === 'tag' ? 'tags' : 'caption';
        where = {
          ...where,
          OR: [{ [col]: { contains: search, mode: 'insensitive' } }],
        };
      }

      return this.prismaService.findAndCountAll({
        table: this.prismaService.post,
        select: {
          id: true,
          caption: true,
          image: true,
          likes: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              name: true,
              email: true,
              username: true,
              photo: true,
            },
          },
        },

        where,
        take: take,
        skip: skip,
      });
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const post = await this.prismaService.post.findUnique({
        where: { id },
        select: {
          id: true,
          caption: true,
          image: true,
          likes: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              name: true,
              email: true,
              username: true,
              photo: true,
            },
          },
        },
      });
      if (!post) {
        throw new NotFoundException('Data not found');
      }
      return post;
    } catch (error) {
      throw error;
    }
  }
}

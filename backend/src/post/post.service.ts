import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

interface GetAll {
  take: number;
  skip: number;
  search?: string;
  searchBy?: string;
  userId?: number;
  isOwnPost: boolean;
}

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

      const postIdInt = typeof postId === 'string' ? parseInt(postId) : postId;
      const post = await this.findById(postIdInt);
      if (!post || post.userId !== user.id) {
        throw new NotFoundException('Data not found');
      }

      const { caption, image, tags } = updatePostDTO;
      const {
        id,
        userId: x,
        ...updatePost
      } = await this.prismaService.post.update({
        where: { id: postIdInt },
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
      throw error;
    }
  }

  async delete(postId: number, userId: number) {
    try {
      const postIdInt = typeof postId === 'string' ? parseInt(postId) : postId;
      const post = await this.findById(postIdInt);
      if (!post || post?.userId !== userId) {
        throw new NotFoundException('Data not found');
      }
      await this.prismaService.post.delete({ where: { id: postIdInt } });
    } catch (error) {
      throw error;
    }
  }

  async like(postId: number, userId: number) {
    try {
      const postIdInt = typeof postId === 'string' ? parseInt(postId) : postId;
      const post = await this.findById(postIdInt);
      if (!post) {
        throw new NotFoundException('Data not found');
      }

      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('Data not found');
      }

      const check = await this.prismaService.userLiked.findUnique({
        where: { postId_userId: { userId, postId: postIdInt } },
      });
      if (check) {
        throw new BadRequestException('Post has been liked');
      }

      await this.prismaService.userLiked.create({
        data: { userId, postId: postIdInt },
      });
      await this.prismaService.post.update({
        where: { id: postIdInt },
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
      const postIdInt = typeof postId === 'string' ? parseInt(postId) : postId;
      const post = await this.findById(postIdInt);
      if (!post) {
        throw new NotFoundException('Data not found');
      }

      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('Data not found');
      }

      const check = await this.prismaService.userLiked.findUnique({
        where: { postId_userId: { userId, postId: postIdInt } },
      });
      if (!check) {
        throw new BadRequestException('Post has not been liked');
      }

      await this.prismaService.userLiked.delete({
        where: { postId_userId: { userId, postId: postIdInt } },
      });

      await this.prismaService.post.update({
        where: { id: postIdInt },
        data: {
          likes: post.likes - 1,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAll({ take, skip, searchBy, search, userId, isOwnPost }: GetAll) {
    try {
      let where = {};
      if (isOwnPost) {
        where = {
          ...where,
          userId: Number(userId),
        };
      }
      if (search && searchBy) {
        const col = searchBy === 'tag' ? 'tags' : 'caption';
        where = {
          ...where,
          OR: [{ [col]: { contains: search, mode: 'insensitive' } }],
        };
      }

      return this.prismaService
        .findAndCountAll({
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
            UserLiked: {
              select: {
                userId: true,
              },
              where: {
                userId: Number(userId),
              },
            },
          },

          where,
          take: take,
          skip: skip,
          orderBy: { id: 'desc' },
        })
        .then((result) => {
          return {
            ...result,
            rows: result.rows.map((row: any) => {
              const { UserLiked, ...data } = row;
              return {
                ...data,
                liked: UserLiked?.length > 0,
              };
            }, []),
          };
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

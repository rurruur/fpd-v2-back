import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../auth/dto/user.dto';
import { PostService } from './post.service';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postservice: PostService) {}

  @Get()
  async getPosts() {
    return this.postservice.getPosts();
  }

  @Post()
  async createPost(
    @Req() req: Request & { user: User },
    @Body() { title, content }: { title: string; content: string },
  ) {
    return this.postservice.createPost(req.user, title, content);
  }

  @Get(':id')
  async getPostDetail(@Param('id') id: number) {
    return this.postservice.getPostDetail(id);
  }

  @Post(':id/comment')
  async addComment(
    @Req() req: Request & { user: User },
    @Param('id') id: number,
    @Body() { comment }: { comment: string },
  ) {
    return this.postservice.addComment(req.user, id, comment);
  }
}

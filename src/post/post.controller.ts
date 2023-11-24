import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { PostService } from './post.service';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postservice: PostService) {}

  @Get()
  async getPosts() {
    return this.postservice.getPosts();
  }
}

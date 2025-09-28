export class CreatePostCommand {
  constructor(
    public readonly authorId: string,
    public readonly content?: string,
  ) {}
}
export class UpdatePostCommand {
  constructor(
    public readonly postId: string,
    public readonly userId: string,
    public readonly content?: string,
    public readonly files?: string[]
  ) {}
}

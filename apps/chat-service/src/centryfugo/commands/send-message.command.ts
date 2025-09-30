export class SendMessageCommand {
  constructor(
    public readonly chatId: string,
    public readonly authorId: string,
    public readonly text: string,
  ) {}
}
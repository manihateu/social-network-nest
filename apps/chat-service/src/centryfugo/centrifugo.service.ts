import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CentrifugoService {
  private readonly apiUrl = process.env.CENTRIFUGO_API_URL || 'http://localhost:8000/api';
  private readonly apiKey = process.env.CENTRIFUGO_API_KEY || 'secret-api-key';

  async publish(channel: string, data: any) {
    await axios.post(
      this.apiUrl,
      {
        method: 'publish',
        params: { channel, data },
      },
      {
        headers: {
          Authorization: `apikey ${this.apiKey}`,
        },
      },
    );
  }
}

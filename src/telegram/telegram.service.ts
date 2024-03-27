import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import configs from '../configs';

@Injectable()
export class TelegramService {
  constructor() { }

  async postChannelMessage(message: string, chatId: string) {
    try {
      const url = `https://api.telegram.org/bot${configs.telegramToken}/sendMessage`;
      const response: AxiosResponse<any> = await axios
        .post(url, { chat_id: chatId, text: message })

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
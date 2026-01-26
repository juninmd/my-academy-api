import { Test, TestingModule } from '@nestjs/testing';
import { TelegramService } from './telegram.service';
import axios from 'axios';
import configs from '../configs';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TelegramService', () => {
  let service: TelegramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramService],
    }).compile();

    service = module.get<TelegramService>(TelegramService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('postChannelMessage', () => {
    it('should post message to telegram', async () => {
      const message = 'test message';
      const chatId = '123';
      const responseData = { ok: true };

      mockedAxios.post.mockResolvedValue({ data: responseData } as any);

      const result = await service.postChannelMessage(message, chatId);

      expect(result).toBe(responseData);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `https://api.telegram.org/bot${configs.telegramToken}/sendMessage`,
        {
          chat_id: chatId,
          text: message,
        },
      );
    });

    it('should propagate error if axios fails', async () => {
      const error = new Error('Network Error');
      mockedAxios.post.mockRejectedValue(error);

      await expect(service.postChannelMessage('msg', 'id')).rejects.toThrow(
        error,
      );
    });
  });
});

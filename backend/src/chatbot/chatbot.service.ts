import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChatbotService {
  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly apiKey = process.env.GOOGLE_API_KEY;
  constructor(private readonly prisma: PrismaService) {}


  async chatWithAI(userId: string, message: string) {
    const requestBody = {
      contents: [{ parts: [{ text: message }] }],
    };
    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });     
      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi từ AI';
      const result = await this.prisma.chatAIMessage.create({
        data: { userId, message, reply },
      });
      return result;

      
    } catch (error) {
      console.error('Error fetching AI response:', error);
      throw new Error('Lỗi khi gọi Google AI Chatbot');
    }
  }
  async create(data: any) {
    return this.prisma.chatAIMessage.create({ data });
  }

  async findAll() {
    return this.prisma.chatAIMessage.findMany();
  }

  async findOne(id: string) {
    const chatbot = await this.prisma.chatAIMessage.findUnique({ where: { id } });
    if (!chatbot) throw new NotFoundException('Chatbot not found');
    return chatbot;
  }

  async update(id: string, data: any) {
    return this.prisma.chatAIMessage.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.chatAIMessage.delete({ where: { id } });
  }
}
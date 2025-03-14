import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChatbotService {
  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly apiKey = process.env.GOOGLE_API_KEY;
  private genAI: GoogleGenerativeAI;
  constructor(private readonly prisma: PrismaService) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!this.apiKey) {
      throw new Error('Google API key is not defined');
    }
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  // async analyzeImage(): Promise<any> {
  //   const jsonData = {
  //     role: 'user',
  //     parts: [
  //       { fileData: { mimeType: 'image/jpeg', fileUri: "https://raovat.sgp1.cdn.digitaloceanspaces.com/2022/09/12/7916347_5dd1e532d3591c6282444bba495d3403.jpg" } },
  //       { text: 'xuất dữ liệu json' },
  //     ],
  //   };
  //     const { parts } = jsonData;
  //     let prompt = "";
  //     for (const part of parts) {
  //       if (part.fileData) {
  //         // Giả sử bạn đã xử lý fileUri và có dữ liệu hình ảnh (ví dụ: base64 hoặc đường dẫn tệp)
  //         // Trong thực tế, bạn sẽ cần thêm logic xử lý hình ảnh ở đây.
  //         // Ví dụ:
  //         // const imageData = await processImage(part.fileData.fileUri);
  //         prompt += "Hình ảnh được cung cấp. "; // Hoặc bạn có thể thêm mô tả nếu có
  //       }
  //       if (part.text) {
  //         prompt += part.text + " ";
  //       }
  //     }
    
  //     // Loại bỏ khoảng trắng thừa ở cuối prompt
  //     prompt = prompt.trim();
  //     console.log("Prompt:", prompt);
      
  //     const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  //     const result = await model.generateContent([{ text: prompt }]);
    
  //     return result;
  //   }
    
    // Giả sử jsonData là dữ liệu JSON bạn cung cấp
  async analyzeImage(fileUrl:any): Promise<any> {
    try {

        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error(`Lỗi tải ảnh: ${response.statusText}`);

        const arrayBuffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(arrayBuffer);

        const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Sử dụng model hỗ trợ hình ảnh

        const prompt = "Phân tích hình ảnh sau và xuất thông tin dưới dạng JSON thuần túy, Trả về 1 mảng JSON";

        const result = await model.generateContent([
            { text: prompt },
            { inlineData: { mimeType: "image/jpeg", data: imageBuffer.toString("base64") } }
        ]);

        const responseText = result.response.text();
        console.log(responseText);
        // Làm sạch chuỗi JSON
        const cleanedJson = responseText.substring(responseText.indexOf('['), responseText.lastIndexOf(']') + 1)
        console.log("Chuỗi JSON sau khi làm sạch:", cleanedJson);

        try {
            const jsonData = JSON.parse(cleanedJson);
            return jsonData;
        } catch (jsonError) {
            console.error("Lỗi parse JSON:", jsonError);
            console.log("Chuỗi trả về lỗi sau khi làm sạch:", cleanedJson)
            return responseText
        }

    } catch (error) {
        console.error("Lỗi phân tích hình ảnh:", error);
        throw error;
    }
}

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
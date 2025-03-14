import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChatbotService {
  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly apiKey = '{"type":"service_account","project_id":"silent-concept-436602-d1","private_key_id":"0decdf4aa9692eac9db8dab99e0ca207195f8db8","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4Gm5YugL54n5w\nuCfM50SztVnmM8jbTcuwwJvvdcaBM+W4XFGobj70UAingkE7V4+o6NIJxfu4dxjw\nxg2B/QOUMU1FHjg5q6sacmnsGw9laAJ3R6SrjRBvxzrxOyugKeXfioGx8kOYBKpu\nHo/jCkkqxiHytsVOSfrdfYFyiIN3xHuvaRvixPYUsraGqSzuSFcAlNtdZ1LyANiC\njhdMtxvga0nv1FU5H/UZ/8dGW5998C6IhD49iHoJC0BmX+MXWFQ6xuVO0ssBAP0E\nH80RgU29AtLuJHV8L4NrL19NdjnWfKLPnlrPgon5AOp8RE+wfqi097SiLLkxTG/h\nolkass5VAgMBAAECggEABdL8zmYOWlUe/XYvHUsQ1uhK0H7TwN17U7tvmAVPYwxs\n0+IfyX2UgkXWeWT/pwNfsjyxCYCvxqe8vq3MKZlMN9RjdGdRDXe4+m7H5Hz8848H\ngYNfI0ESenkS55J8WYrsEKAzQCvA3tEBQY5KPrs3SQ/YbRev+60PwaN4qQlY12GA\n3jqVBHzZRibs+YQQvxeAxJtho0R34ruO9OECUPGyqC+3XWCefpekK3Ycvfs2r3qE\nEX8tlNlAiuV+lmNKYgOWfxuoMS6Mag1h5E/kmbiuOkHIJEFX985q85gfE4HuzVJt\nit/C8o4niD1VlCbXMpK7DGqxClVRSjp6HUzu0modFQKBgQDcb65FwV8FwgEEt9WS\nnv4KZjWmr6LNvhTan+HZGEoESh6UmCm8Tpj+qEd7PUR3rf9T/a6POQE+kOMI8PVh\nmh2v5yVGBFmsseXkPlCLZVwnKLLDc+eItZrxdQlViSaih90xVhoUb/5KnumXfg/N\n7IbRt2hO3atzIfH81Mbjw/2+kwKBgQDVziW32kr2WwfP2JyJHA1oaB3W4Xkg4XAz\nqrCTaJ6IFmvPHp9pgrzzaktQRmkLFJqHmbooF0gkFDC2Q8/EMusGffJkHPXX3xXz\n9jiOgRIEryifX/LG2adeS1r2LhfP/HcweL0B6TJj2h3NeT2i4FvUxHDTMvirB+Kn\nSkoPRQ7odwKBgQClwHhbTUblLnbTlGPMhy7gpPBMsR6K9BX8OmJ5enEVfqI1+6DO\nTo9uVRzCx1P3ZedqwYMDgMq1v/5nV8A7LsaJ4RW+60B+wZnqoQyxdHrxmwGoRDvi\nKSQj0Ww+XA2oAt9I3MRpf7jHZWyiFBFQNz087ltJihcEUI8EHP6cf2AKbwKBgQCI\n/+E3X88s8MOesUQMr0cAIccNC8lcAlitIrCmpCEBPqyyOQMYzsdYikHcHGHu0bL7\nNMwOKGz3gWB9ShJ1u9LRhB6ve8ckHjSo8Jro5VewXLSA+zBLrugKCestV/e2NCYD\njzo9YToCtZ7nLMsL9Qui2IUbL8wbe6AGZhnykuOsnQKBgGDVqHbDQnoZMd3sjeoP\ncgP/gVCBxEvtwaOkHO67Xyz4flm+haL2ikdSsp2W4LIJFpm0YwjHmYOUAQgzkQGE\n2UPZtmlUiEy7Cr9y5gEhgwEbDf5Y33BOe77wlR5xG9bDeruC9HRAs11PaHS6rNvL\nwuPteUhxaTRIaFqPdsOYOq3F\n-----END PRIVATE KEY-----\n","client_email":"uploadbillrau-960@silent-concept-436602-d1.iam.gserviceaccount.com","client_id":"115017842567271657668","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/uploadbillrau-960%40silent-concept-436602-d1.iam.gserviceaccount.com","universe_domain":"googleapis.com"}';
  private genAI: GoogleGenerativeAI;
  constructor(private readonly prisma: PrismaService) {
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

        const prompt = "Phân tích hình ảnh sau và xuất thông tin dưới dạng JSON thuần túy, Trả về 1 mảng JSON object có chưa key name, description, price,quantity";

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
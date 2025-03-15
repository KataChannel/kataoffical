"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ChatbotService = class ChatbotService {
    constructor(prisma) {
        this.prisma = prisma;
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
        this.apiKey = process.env.GOOGLE_API_KEY;
        if (!this.apiKey) {
            throw new Error('Google API key is not defined');
        }
        this.genAI = new generative_ai_1.GoogleGenerativeAI(this.apiKey);
    }
    async analyzeImage(fileUrl) {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok)
                throw new Error(`Lỗi tải ảnh: ${response.statusText}`);
            const arrayBuffer = await response.arrayBuffer();
            const imageBuffer = Buffer.from(arrayBuffer);
            const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const prompt = "Phân tích hình ảnh sau và xuất thông tin dưới dạng JSON, định dạng mẫu [{\"title\":\"Trứng bắc thảo\",\"dvt\":\"Quả\",\"khachhang\":[{\"madonhang\":\"TG-AA00002\",\"name\":\"99 SOUL\",\"data\":{\"SLDAT\":1,\"SLTT\":\"1,2\"}},{\"name\":\"NHÀ HÀNG DOOKKI\",\"madonhang\":\"TG-AA00001\",\"data\":{\"SLDAT\":1,\"SLTT\":\"1,2\"}}]},{\"title\":\"Bún gạo\",\"dvt\":\"Kg\",\"khachhang\":[{\"name\":\"99 SOUL\",\"madonhang\":\"TG-AA00002\",\"data\":{\"SLDAT\":1,\"SLTT\":\"1,2\"}},{\"name\":\"NHÀ HÀNG DOOKKI\",\"madonhang\":\"TG-AA00001\",\"data\":{\"SLDAT\":\"\",\"SLTT\":\"1,2\"}}]}]";
            const result = await model.generateContent([
                { text: prompt },
                { inlineData: { mimeType: "image/jpeg", data: imageBuffer.toString("base64") } }
            ]);
            const responseText = result.response.text();
            const cleanedJson = responseText.substring(responseText.indexOf('['), responseText.lastIndexOf(']') + 1);
            console.log("Chuỗi JSON sau khi làm sạch:", cleanedJson);
            try {
                const jsonData = JSON.parse(cleanedJson);
                return jsonData;
            }
            catch (jsonError) {
                console.error("Lỗi parse JSON:", jsonError);
                console.log("Chuỗi trả về lỗi sau khi làm sạch:", cleanedJson);
                return responseText;
            }
        }
        catch (error) {
            console.error("Lỗi phân tích hình ảnh:", error);
            throw error;
        }
    }
    async chatWithAI(userId, message) {
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
        }
        catch (error) {
            console.error('Error fetching AI response:', error);
            throw new Error('Lỗi khi gọi Google AI Chatbot');
        }
    }
    async create(data) {
        return this.prisma.chatAIMessage.create({ data });
    }
    async findAll() {
        return this.prisma.chatAIMessage.findMany();
    }
    async findOne(id) {
        const chatbot = await this.prisma.chatAIMessage.findUnique({ where: { id } });
        if (!chatbot)
            throw new common_1.NotFoundException('Chatbot not found');
        return chatbot;
    }
    async update(id, data) {
        return this.prisma.chatAIMessage.update({ where: { id }, data });
    }
    async remove(id) {
        return this.prisma.chatAIMessage.delete({ where: { id } });
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatbotService);
//# sourceMappingURL=chatbot.service.js.map
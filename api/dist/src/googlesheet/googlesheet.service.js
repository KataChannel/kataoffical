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
exports.GooglesheetService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const prisma_service_1 = require("../../prisma/prisma.service");
const socket_gateway_1 = require("../socket.gateway");
let GooglesheetService = class GooglesheetService {
    constructor(prisma, _SocketGateway) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        const serviceAccount = 'credentials.json';
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: serviceAccount,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        this.sheets = googleapis_1.google.sheets({ version: 'v4', auth });
    }
    async findAll(sheetId, sheetName) {
        const res = await this.sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${sheetName}!A:Z`,
        });
        const rows = res.data.values;
        console.log('rows', rows);
        if (!rows) {
            return [];
        }
        return rows.map((row) => {
            const obj = {};
            row.forEach((cell, i) => {
                obj[`field${i + 1}`] = cell;
            });
            return obj;
        });
    }
    async create(sheetId, sheetName, data, numfield = 1) {
        const values = data.map((item) => Array.from({ length: numfield }, (_, i) => item[`field${i + 1}`] || ''));
        const res = await this.sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: `${sheetName}!A:Z`,
            valueInputOption: 'USER_ENTERED',
            requestBody: { values },
        });
        return res.data;
    }
    async update(rowNumber, data, numfield = 1) {
    }
    async delete(rowNumber) {
    }
};
exports.GooglesheetService = GooglesheetService;
exports.GooglesheetService = GooglesheetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway])
], GooglesheetService);
//# sourceMappingURL=googlesheet.service.js.map
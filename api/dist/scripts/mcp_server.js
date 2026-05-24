"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const sse_js_1 = require("@modelcontextprotocol/sdk/server/sse.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const client_1 = require("@prisma/client");
const express_1 = require("express");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const API_DIR = path.resolve(__dirname, "..");
const ROOT_DIR = path.resolve(API_DIR, "..");
const ENV_FILE = path.join(API_DIR, ".env");
if (fs.existsSync(ENV_FILE)) {
    const envContent = fs.readFileSync(ENV_FILE, "utf-8");
    for (const line of envContent.split("\n")) {
        const match = line.match(/^\s*DATABASE_URL\s*=\s*["']?(.*?)["']?\s*$/);
        if (match) {
            process.env.DATABASE_URL = match[1];
            break;
        }
    }
}
const prisma = new client_1.PrismaClient();
function createMcpServer() {
    const server = new index_js_1.Server({
        name: "rausach-optimized-mcp",
        version: "1.0.0",
    }, {
        capabilities: {
            tools: {},
        },
    });
    server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
        return {
            tools: [
                {
                    name: "check_stock_discrepancy",
                    description: "Kiểm tra chênh lệch số lượng tồn kho giữa SanphamKho (HCM) và TonKho toàn cục (Chỉ đọc).",
                    inputSchema: {
                        type: "object",
                        properties: {},
                    },
                },
                {
                    name: "check_optimization_diagnostics",
                    description: "Quét và phân tích các chỉ số sản phẩm cần tối ưu hóa, như số lượng âm kho hoặc giá bán bằng 0 (Chỉ đọc, bảo mật cao).",
                    inputSchema: {
                        type: "object",
                        properties: {},
                    },
                },
                {
                    name: "read_delivery_excel",
                    description: "Đọc và phân tích file Excel phiếu kiểm kho/phiếu giao hàng nằm trong docs/xuly (Chỉ đọc).",
                    inputSchema: {
                        type: "object",
                        properties: {
                            fileName: {
                                type: "string",
                                description: "Tên file Excel trong docs/xuly (ví dụ: KT PHIẾU GIAO HÀNG TRAN GIA.xlsx)",
                                default: "KT PHIẾU GIAO HÀNG TRAN GIA.xlsx"
                            }
                        }
                    },
                },
                {
                    name: "export_stock_report",
                    description: "Xuất báo cáo tổng hợp chi tiết dạng JSON về tình trạng tồn kho hiện tại (Chỉ đọc).",
                    inputSchema: {
                        type: "object",
                        properties: {},
                    },
                }
            ],
        };
    });
    server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        try {
            if (name === "check_stock_discrepancy") {
                const khoId = "4cc01811-61f5-4bdc-83de-a493764e9258";
                const products = await prisma.sanpham.findMany({
                    select: {
                        id: true,
                        masp: true,
                        title: true,
                        SanphamKho: { where: { khoId } },
                        TonKho: true,
                    }
                });
                const discrepancies = [];
                for (const p of products) {
                    const slKho = p.SanphamKho[0] ? Number(p.SanphamKho[0].soluong) : 0;
                    const slTonKho = p.TonKho ? Number(p.TonKho.slton) : 0;
                    if (Math.abs(slKho - slTonKho) > 0.001) {
                        discrepancies.push({
                            masp: p.masp,
                            title: p.title,
                            slSanphamKho: slKho,
                            slTonKho: slTonKho,
                            chenhlech: slKho - slTonKho
                        });
                    }
                }
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify({
                                message: `Tìm thấy ${discrepancies.length} sản phẩm bị lệch số lượng tồn giữa 2 bảng`,
                                discrepancies: discrepancies.slice(0, 50)
                            }, null, 2)
                        }]
                };
            }
            if (name === "check_optimization_diagnostics") {
                const totalProducts = await prisma.sanpham.count();
                const negativeStockKho = await prisma.sanphamKho.count({
                    where: { soluong: { lt: 0 } }
                });
                const negativeStockGlobal = await prisma.tonKho.count({
                    where: { slton: { lt: 0 } }
                });
                const zeroBasePrice = await prisma.sanpham.count({
                    where: { giagoc: 0 }
                });
                const zeroSellPrice = await prisma.sanpham.count({
                    where: { giaban: 0 }
                });
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify({
                                status: "SUCCESS",
                                message: "Báo cáo chỉ số chẩn đoán hệ thống (Không ghi đè dữ liệu)",
                                metrics: {
                                    totalProductsInDB: totalProducts,
                                    negativeStockInHCMWarehouse: negativeStockKho,
                                    negativeStockInGlobalInventory: negativeStockGlobal,
                                    productsWithZeroBasePrice: zeroBasePrice,
                                    productsWithZeroSellPrice: zeroSellPrice,
                                },
                                recommendation: (negativeStockKho > 0 || negativeStockGlobal > 0)
                                    ? "Hệ thống có sản phẩm bị âm kho. Hãy chạy kịch bản 'Tối ưu hóa sản phẩm' thông qua menu hệ thống của admin (Lựa chọn 6 trong run_dev.sh) để tự động sửa chênh lệch này."
                                    : "Dữ liệu tồn kho ở trạng thái bình thường."
                            }, null, 2)
                        }]
                };
            }
            if (name === "read_delivery_excel") {
                const fileName = args?.fileName || "KT PHIẾU GIAO HÀNG TRAN GIA.xlsx";
                const filePath = path.join(ROOT_DIR, "docs", "xuly", fileName);
                if (!fs.existsSync(filePath)) {
                    return {
                        isError: true,
                        content: [{ type: "text", text: `Không tìm thấy file Excel tại đường dẫn: ${filePath}` }]
                    };
                }
                const workbook = xlsx.readFile(filePath);
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const rawData = xlsx.utils.sheet_to_json(worksheet);
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify({
                                file: fileName,
                                totalRows: rawData.length,
                                preview: rawData.slice(0, 15)
                            }, null, 2)
                        }]
                };
            }
            if (name === "export_stock_report") {
                const allStock = await prisma.sanpham.findMany({
                    select: {
                        masp: true,
                        title: true,
                        giagoc: true,
                        giaban: true,
                        SanphamKho: { select: { soluong: true } },
                        TonKho: { select: { slton: true } }
                    }
                });
                const reportData = allStock.map(p => ({
                    masp: p.masp,
                    title: p.title,
                    giagoc: Number(p.giagoc) || 0,
                    giaban: Number(p.giaban) || 0,
                    tonKhoHCM: p.SanphamKho[0] ? Number(p.SanphamKho[0].soluong) : 0,
                    tonKhoToanCuc: p.TonKho ? Number(p.TonKho.slton) : 0
                }));
                return {
                    content: [{
                            type: "text",
                            text: JSON.stringify({
                                exportedAt: new Date().toISOString(),
                                totalProductsExported: reportData.length,
                                products: reportData.slice(0, 100)
                            }, null, 2)
                        }]
                };
            }
            throw new Error(`Tool không hợp lệ: ${name}`);
        }
        catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Lỗi khi chạy tool ${name}: ${error.message}` }]
            };
        }
    });
    return server;
}
async function start() {
    const isSse = process.argv.includes("--sse");
    if (isSse) {
        const app = (0, express_1.default)();
        const PORT = 3002;
        const API_KEY = "RS_SECRET_DEVELOPER_KEY_2026";
        app.use(express_1.default.json());
        const sessions = new Map();
        app.get("/sse", async (req, res) => {
            const apiKey = req.headers["x-api-key"] || req.query.apiKey;
            if (apiKey !== API_KEY) {
                res.status(401).send("Unauthorized: Invalid API Key");
                return;
            }
            const transport = new sse_js_1.SSEServerTransport("/messages", res);
            const sessionId = transport.sessionId;
            const serverInstance = createMcpServer();
            sessions.set(sessionId, { server: serverInstance, transport });
            console.error(`📡 SSE: Client connected (sessionId: ${sessionId})`);
            res.on("close", async () => {
                console.error(`📡 SSE: Client disconnected (sessionId: ${sessionId})`);
                const session = sessions.get(sessionId);
                if (session) {
                    try {
                        await session.server.close();
                    }
                    catch (e) {
                    }
                    sessions.delete(sessionId);
                }
            });
            await serverInstance.connect(transport);
        });
        app.post("/messages", async (req, res) => {
            const sessionId = req.query.sessionId;
            if (!sessionId) {
                res.status(400).json({ error: "Missing sessionId query parameter" });
                return;
            }
            const session = sessions.get(sessionId);
            if (!session) {
                res.status(404).json({
                    error: "Session not found",
                    hint: "The SSE session may have expired. Reconnect to GET /sse first.",
                    requestedSessionId: sessionId,
                    activeSessions: sessions.size,
                });
                return;
            }
            await session.transport.handleMessage(req, res);
        });
        app.get("/health", (_req, res) => {
            res.json({
                status: "ok",
                activeSessions: sessions.size,
                uptime: process.uptime(),
            });
        });
        app.listen(PORT, "0.0.0.0", () => {
            console.error(`📡 Rausach Shared MCP Server (SSE) is running at http://0.0.0.0:${PORT}`);
            console.error(`🔑 API Key: ${API_KEY}`);
            console.error(`💡 Health check: http://0.0.0.0:${PORT}/health`);
        });
    }
    else {
        const serverInstance = createMcpServer();
        const transport = new stdio_js_1.StdioServerTransport();
        await serverInstance.connect(transport);
        console.error("🚀 Rausach Optimized MCP Server (Stdio, Read-Only) is running...");
    }
}
start().catch((err) => {
    console.error("Mở kết nối MCP thất bại:", err);
    process.exit(1);
});
//# sourceMappingURL=mcp_server.js.map
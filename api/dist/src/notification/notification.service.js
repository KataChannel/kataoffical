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
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const webPush = require("web-push");
const prisma_service_1 = require("../../prisma/prisma.service");
let NotificationService = NotificationService_1 = class NotificationService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(NotificationService_1.name);
        const publicVapidKey = process.env.VAPID_PUBLIC_KEY || 'BAvPai7WQsKJEriy6QzNwR8PilSz-BugoT221pgKAgXQb7CH55KLe8WbEP23a7GdNsppktd0IR9lTmpLPsgJuyE';
        const privateVapidKey = process.env.VAPID_PRIVATE_KEY || '6KyQ1dwt4FYoVedItiokuBj3v1-RWEUgetixuxxymUY';
        webPush.setVapidDetails('mailto:admin@rausachtrangia.com', publicVapidKey, privateVapidKey);
    }
    async subscribe(userId, subscription) {
        try {
            if (!subscription || !subscription.keys) {
                throw new Error('Invalid subscription object');
            }
            this.logger.log(`Subscribing user ${userId} to push notifications`);
            const existingSub = await this.prisma.pushSubscription.findUnique({
                where: { endpoint: subscription.endpoint },
            });
            if (existingSub) {
                return await this.prisma.pushSubscription.update({
                    where: { endpoint: subscription.endpoint },
                    data: {
                        userId,
                        p256dh: subscription.keys.p256dh,
                        auth: subscription.keys.auth,
                    },
                });
            }
            return await this.prisma.pushSubscription.create({
                data: {
                    userId: userId,
                    endpoint: subscription.endpoint,
                    p256dh: subscription.keys.p256dh,
                    auth: subscription.keys.auth,
                },
            });
        }
        catch (error) {
            this.logger.error('Failed to subscribe to push notifications', error.stack);
            throw error;
        }
    }
    async unsubscribe(endpoint) {
        try {
            const existing = await this.prisma.pushSubscription.findUnique({
                where: { endpoint },
            });
            if (existing) {
                await this.prisma.pushSubscription.delete({
                    where: { endpoint },
                });
            }
            return { success: true };
        }
        catch (error) {
            this.logger.error('Failed to unsubscribe', error.stack);
            return { success: false, error: error.message };
        }
    }
    async sendNotificationToUser(userId, payload) {
        try {
            this.logger.log(`Sending notification to user ${userId}`);
            const notification = await this.prisma.notification.create({
                data: {
                    userId,
                    title: payload.title || 'Thông báo mới',
                    message: payload.body || JSON.stringify(payload),
                    link: payload.url || null,
                    type: payload.type || 'system',
                },
            });
            payload.id = notification.id;
            const subscriptions = await this.prisma.pushSubscription.findMany({
                where: { userId },
            });
            if (subscriptions.length === 0) {
                this.logger.log(`No active subscriptions found for user ${userId}`);
                return;
            }
            const pushPayload = {
                notification: {
                    title: payload.title || 'Thông báo mới',
                    body: payload.body || '',
                    icon: payload.icon || '/icons/icon-72x72.png',
                    vibrate: [100, 50, 100],
                    data: {
                        url: payload.url || '/',
                        id: notification.id
                    },
                    actions: payload.actions || []
                }
            };
            const sendPromises = subscriptions.map((sub) => {
                const pushSubscription = {
                    endpoint: sub.endpoint,
                    keys: {
                        p256dh: sub.p256dh,
                        auth: sub.auth,
                    },
                };
                return webPush
                    .sendNotification(pushSubscription, JSON.stringify(pushPayload))
                    .catch(async (error) => {
                    if (error.statusCode === 404 || error.statusCode === 410) {
                        this.logger.warn(`Subscription has expired or is no longer valid: ${sub.endpoint}`);
                        await this.prisma.pushSubscription.delete({
                            where: { id: sub.id },
                        });
                    }
                    else {
                        this.logger.error('Error sending push notification', error.stack);
                    }
                });
            });
            await Promise.allSettled(sendPromises);
            this.logger.log(`Successfully dispatched notification to ${subscriptions.length} endpoints for user ${userId}`);
        }
        catch (error) {
            this.logger.error('Error in sendNotificationToUser', error.stack);
        }
    }
    async broadcastToRoles(roles, payload) {
        try {
            this.logger.log(`Broadcasting notification to roles: ${roles.join(', ')}`);
            const users = await this.prisma.user.findMany({
                where: {
                    roles: {
                        some: {
                            role: {
                                name: { in: roles, mode: 'insensitive' }
                            }
                        }
                    }
                },
                select: { id: true }
            });
            this.logger.log(`Found ${users.length} users with matching roles`);
            const sendPromises = users.map(user => this.sendNotificationToUser(user.id, payload));
            await Promise.allSettled(sendPromises);
        }
        catch (error) {
            this.logger.error('Error in broadcastToRoles', error.stack);
        }
    }
    async broadcastToAdmins(payload) {
        return this.broadcastToRoles(['Admin', 'PKD', 'ORDER'], payload);
    }
    async getUserNotifications(userId, search) {
        try {
            const where = { userId };
            if (search) {
                where.OR = [
                    { title: { contains: search, mode: 'insensitive' } },
                    { message: { contains: search, mode: 'insensitive' } },
                ];
            }
            return await this.prisma.notification.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                take: 50,
            });
        }
        catch (error) {
            this.logger.error(`Error in getUserNotifications for user ${userId}: ${error.message}`, error.stack);
            return [];
        }
    }
    async markAsRead(id) {
        return this.prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }
    async markAllAsRead(userId) {
        return this.prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
    }
    async deleteNotification(id) {
        return this.prisma.notification.delete({
            where: { id },
        });
    }
    async getUnreadCount(userId) {
        try {
            const count = await this.prisma.notification.count({
                where: { userId, isRead: false },
            });
            return { count };
        }
        catch (error) {
            this.logger.error(`Error in getUnreadCount for user ${userId}: ${error.message}`, error.stack);
            return { count: 0 };
        }
    }
    async sendTelegramMessage(message) {
        const token = process.env.TELEGRAM_BOT_TOKEN?.replace(/^["']|["']$/g, '');
        const chatId = process.env.TELEGRAM_CHAT_ID?.replace(/^["']|["']$/g, '');
        if (!token || !chatId || token === 'your_bot_token_here' || chatId === 'your_chat_id_here') {
            this.logger.warn('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in environment variables');
            return false;
        }
        try {
            const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML',
                }),
            });
            if (!response.ok) {
                const errText = await response.text();
                this.logger.error(`Failed to send Telegram message. Status: ${response.status}. Error: ${errText}`);
                return false;
            }
            this.logger.log('Successfully sent Telegram notification');
            return true;
        }
        catch (error) {
            this.logger.error('Error sending Telegram message', error.stack || error.message);
            return false;
        }
    }
    async sendChotkhoTelegramNotification(chotkhoData) {
        const khoName = chotkhoData.kho?.name || 'N/A';
        const creator = chotkhoData.user?.profile?.name || chotkhoData.user?.email || 'Hệ thống';
        const ngayChotFormatted = new Date(chotkhoData.ngaychot).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        const details = chotkhoData.details || [];
        const diffItems = details.filter((d) => Number(d.chenhlech) !== 0 || Number(d.slhuy) > 0);
        let message = `📦 <b>THÔNG BÁO CHỐT KHO</b>\n`;
        message += `📋 <b>Mã chốt kho:</b> <code>${chotkhoData.codeId || 'N/A'}</code>\n`;
        message += `📝 <b>Tiêu đề:</b> ${chotkhoData.title || 'N/A'}\n`;
        message += `🏢 <b>Kho:</b> ${khoName}\n`;
        message += `📅 <b>Thời gian chốt:</b> ${ngayChotFormatted}\n`;
        message += `👤 <b>Người thực hiện:</b> ${creator}\n`;
        message += `📊 <b>Tổng sản phẩm chốt:</b> ${details.length}\n`;
        if (diffItems.length > 0) {
            message += `\n⚠️ <b>Danh sách sản phẩm chênh lệch/hủy (${diffItems.length}):</b>\n`;
            const displayedItems = diffItems.slice(0, 15);
            displayedItems.forEach((d) => {
                const masp = d.sanpham?.masp || 'N/A';
                const title = d.sanpham?.title || 'N/A';
                const chenhlech = Number(d.chenhlech);
                const slhuy = Number(d.slhuy);
                const sign = chenhlech > 0 ? '+' : '';
                message += `- <code>${masp}</code> - ${title}: Lệch <b>${sign}${chenhlech}</b> | Hủy <b>${slhuy}</b>\n`;
            });
            if (diffItems.length > 15) {
                message += `... và ${diffItems.length - 15} sản phẩm chênh lệch khác.\n`;
            }
        }
        else {
            message += `\n✅ Không có chênh lệch tồn kho.`;
        }
        return this.sendTelegramMessage(message);
    }
    async handleOrderEvent(order, action, oldOrder) {
        try {
            const targetKhoId = order.khoId || "4cc01811-61f5-4bdc-83de-a493764e9258";
            const latestChot = await this.prisma.chotkho.findFirst({
                where: { khoId: targetKhoId, isActive: true },
                orderBy: { ngaychot: 'desc' },
                include: { kho: true }
            });
            let chot = latestChot;
            if (!chot) {
                chot = await this.prisma.chotkho.findFirst({
                    where: { isActive: true },
                    orderBy: { ngaychot: 'desc' },
                    include: { kho: true }
                });
            }
            if (!chot) {
                this.logger.log('No active chotkho session found. Post-closing order monitoring inactive.');
                return;
            }
            const chotkhoTime = chot.createdAt || chot.ngaychot;
            const eventTime = new Date();
            if (eventTime <= chotkhoTime) {
                return;
            }
            const toVNString = (date) => {
                const d = new Date(date.getTime() + 7 * 60 * 60 * 1000);
                return d.toISOString().split('T')[0];
            };
            const chotDateStr = toVNString(chot.ngaychot);
            const nextDayDate = new Date(chot.ngaychot);
            nextDayDate.setDate(nextDayDate.getDate() + 1);
            const nextDayDateStr = toVNString(nextDayDate);
            const nextDayStart = new Date(nextDayDateStr + 'T00:00:00+07:00');
            const nextDayOrdersCount = await this.prisma.donhang.count({
                where: {
                    id: { not: order.id },
                    khoId: targetKhoId,
                    createdAt: { gt: chot.createdAt },
                    OR: [
                        { ngaygiao: { gte: nextDayStart } },
                        { createdAt: { gte: nextDayStart } }
                    ]
                }
            });
            if (nextDayOrdersCount > 0) {
                this.logger.log(`Monitoring stopped. ${nextDayOrdersCount} next-day orders already processed.`);
                return;
            }
            let fullOrder = order;
            if (action !== 'DELETE') {
                fullOrder = await this.prisma.donhang.findUnique({
                    where: { id: order.id },
                    include: {
                        sanpham: {
                            include: {
                                sanpham: true
                            }
                        },
                        khachhang: true
                    }
                });
                if (!fullOrder)
                    return;
            }
            const khachhangName = fullOrder.khachhang?.name || 'N/A';
            const isCurrentOrderNextDay = fullOrder.ngaygiao >= nextDayStart || new Date(fullOrder.createdAt) >= nextDayStart;
            const orderNgaygiaoFormatted = fullOrder.ngaygiao
                ? new Date(fullOrder.ngaygiao).toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
                : 'N/A';
            const orderTongtien = Number(fullOrder.tongtien || 0).toLocaleString('vi-VN');
            if (isCurrentOrderNextDay) {
                let msg = `🔔 <b>ĐƠN HÀNG MỚI ĐẦU TIÊN CỦA NGÀY HÔM SAU</b>\n`;
                msg += `🏢 <b>Kho:</b> ${chot.kho?.name || 'N/A'}\n`;
                msg += `📋 <b>Mã đơn hàng:</b> <code>${fullOrder.madonhang}</code>\n`;
                msg += `👤 <b>Khách hàng:</b> ${khachhangName}\n`;
                msg += `📅 <b>Ngày giao:</b> ${orderNgaygiaoFormatted}\n`;
                msg += `💰 <b>Tổng tiền:</b> ${orderTongtien} đ\n`;
                msg += `🛑 <i>Hệ thống ghi nhận đơn hàng mới đầu tiên của ngày hôm sau và DỪNG giám sát các phát sinh sau chốt kho.</i>`;
                await this.sendTelegramMessage(msg);
                return;
            }
            let actionText = '';
            if (action === 'CREATE')
                actionText = 'TẠO MỚI';
            else if (action === 'UPDATE')
                actionText = 'CẬP NHẬT';
            else if (action === 'DELETE')
                actionText = 'XÓA';
            let msg = `⚠️ <b>PHÁT SINH SAU CHỐT KHO [${chot.title}]</b>\n`;
            msg += `⚡ <b>Hành động:</b> <code>${actionText}</code> đơn hàng\n`;
            msg += `📋 <b>Mã đơn hàng:</b> <code>${fullOrder.madonhang}</code>\n`;
            msg += `👤 <b>Khách hàng:</b> ${khachhangName}\n`;
            msg += `📅 <b>Ngày giao:</b> ${orderNgaygiaoFormatted}\n`;
            msg += `💰 <b>Tổng tiền:</b> ${orderTongtien} đ\n`;
            msg += `🏢 <b>Kho:</b> ${chot.kho?.name || 'N/A'}\n`;
            if (action === 'UPDATE' && oldOrder) {
                msg += `\n🔍 <b>Chi tiết thay đổi:</b>\n`;
                if (oldOrder.status !== fullOrder.status) {
                    msg += `- Trạng thái: <code>${oldOrder.status}</code> ➡️ <code>${fullOrder.status}</code>\n`;
                }
                const oldNgaygiao = oldOrder.ngaygiao ? new Date(oldOrder.ngaygiao).toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) : 'N/A';
                if (oldNgaygiao !== orderNgaygiaoFormatted) {
                    msg += `- Ngày giao: <code>${oldNgaygiao}</code> ➡️ <code>${orderNgaygiaoFormatted}</code>\n`;
                }
                const oldProducts = oldOrder.sanpham || [];
                const newProducts = fullOrder.sanpham || [];
                const oldProdMap = new Map(oldProducts.map((p) => [p.idSP || p.id, p]));
                const newProdMap = new Map(newProducts.map((p) => [p.idSP || p.id, p]));
                const added = [];
                const removed = [];
                const changed = [];
                newProducts.forEach((np) => {
                    const npId = np.idSP || np.id;
                    const op = oldProdMap.get(npId);
                    if (!op) {
                        added.push(np);
                    }
                    else {
                        const opQty = Number(op.slnhan ?? op.slgiao ?? op.sldat ?? 0);
                        const npQty = Number(np.slnhan ?? np.slgiao ?? np.sldat ?? 0);
                        if (opQty !== npQty) {
                            changed.push({ product: np, oldQty: opQty, newQty: npQty });
                        }
                    }
                });
                oldProducts.forEach((op) => {
                    const opId = op.idSP || op.id;
                    if (!newProdMap.has(opId)) {
                        removed.push(op);
                    }
                });
                if (added.length > 0) {
                    msg += `➕ <b>Sản phẩm được thêm:</b>\n`;
                    for (const item of added) {
                        const name = item.sanpham?.title || item.title || 'Sản phẩm';
                        const qty = Number(item.slnhan ?? item.slgiao ?? item.sldat ?? 0);
                        msg += `  • ${name}: <b>${qty}</b>\n`;
                    }
                }
                if (removed.length > 0) {
                    msg += `➖ <b>Sản phẩm bị xóa:</b>\n`;
                    for (const item of removed) {
                        const name = item.sanpham?.title || item.title || 'Sản phẩm';
                        msg += `  • ${name}\n`;
                    }
                }
                if (changed.length > 0) {
                    msg += `📝 <b>Thay đổi số lượng:</b>\n`;
                    for (const item of changed) {
                        const name = item.product.sanpham?.title || item.product.title || 'Sản phẩm';
                        msg += `  • ${name}: <code>${item.oldQty}</code> ➡️ <b>${item.newQty}</b>\n`;
                    }
                }
            }
            await this.sendTelegramMessage(msg);
        }
        catch (err) {
            this.logger.error('Error handling order event for post-closing monitoring', err.stack);
        }
    }
    async handleDathangEvent(dathang, action, oldDathang) {
        try {
            const targetKhoId = dathang.khoId || "4cc01811-61f5-4bdc-83de-a493764e9258";
            const latestChot = await this.prisma.chotkho.findFirst({
                where: { khoId: targetKhoId, isActive: true },
                orderBy: { ngaychot: 'desc' },
                include: { kho: true }
            });
            let chot = latestChot;
            if (!chot) {
                chot = await this.prisma.chotkho.findFirst({
                    where: { isActive: true },
                    orderBy: { ngaychot: 'desc' },
                    include: { kho: true }
                });
            }
            if (!chot) {
                this.logger.log('No active chotkho session found. Post-closing order monitoring inactive.');
                return;
            }
            const chotkhoTime = chot.createdAt || chot.ngaychot;
            const eventTime = new Date();
            if (eventTime <= chotkhoTime) {
                return;
            }
            const toVNString = (date) => {
                const d = new Date(date.getTime() + 7 * 60 * 60 * 1000);
                return d.toISOString().split('T')[0];
            };
            const nextDayDate = new Date(chot.ngaychot);
            nextDayDate.setDate(nextDayDate.getDate() + 1);
            const nextDayDateStr = toVNString(nextDayDate);
            const nextDayStart = new Date(nextDayDateStr + 'T00:00:00+07:00');
            const nextDayOrdersCount = await this.prisma.donhang.count({
                where: {
                    khoId: targetKhoId,
                    createdAt: { gt: chot.createdAt },
                    OR: [
                        { ngaygiao: { gte: nextDayStart } },
                        { createdAt: { gte: nextDayStart } }
                    ]
                }
            });
            if (nextDayOrdersCount > 0) {
                this.logger.log(`Monitoring stopped. ${nextDayOrdersCount} next-day orders already processed.`);
                return;
            }
            let fullDathang = dathang;
            if (action !== 'DELETE') {
                fullDathang = await this.prisma.dathang.findUnique({
                    where: { id: dathang.id },
                    include: {
                        sanpham: {
                            include: {
                                sanpham: true
                            }
                        },
                        nhacungcap: true
                    }
                });
                if (!fullDathang)
                    return;
            }
            const nhacungcapName = fullDathang.nhacungcap?.name || 'N/A';
            const ngaynhanFormatted = fullDathang.ngaynhan
                ? new Date(fullDathang.ngaynhan).toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
                : 'N/A';
            const tongtien = fullDathang.sanpham?.reduce((sum, sp) => sum + (Number(sp.slnhan || sp.slgiao || sp.sldat || 0) * Number(sp.gianhap || 0)), 0) || 0;
            const tongtienFormatted = tongtien.toLocaleString('vi-VN');
            let actionText = '';
            if (action === 'CREATE')
                actionText = 'TẠO MỚI';
            else if (action === 'UPDATE')
                actionText = 'CẬP NHẬT';
            else if (action === 'DELETE')
                actionText = 'XÓA';
            let msg = `⚠️ <b>PHÁT SINH SAU CHỐT KHO [${chot.title}]</b>\n`;
            msg += `⚡ <b>Hành động:</b> <code>${actionText}</code> đặt hàng (NCC)\n`;
            msg += `📋 <b>Mã đặt hàng:</b> <code>${fullDathang.madncc}</code>\n`;
            msg += `👤 <b>Nhà cung cấp:</b> ${nhacungcapName}\n`;
            msg += `📅 <b>Ngày nhận dự kiến:</b> ${ngaynhanFormatted}\n`;
            msg += `💰 <b>Tổng tiền:</b> ${tongtienFormatted} đ\n`;
            msg += `🏢 <b>Kho:</b> ${chot.kho?.name || 'N/A'}\n`;
            if (action === 'UPDATE' && oldDathang) {
                msg += `\n🔍 <b>Chi tiết thay đổi:</b>\n`;
                if (oldDathang.status !== fullDathang.status) {
                    msg += `- Trạng thái: <code>${oldDathang.status}</code> ➡️ <code>${fullDathang.status}</code>\n`;
                }
                const oldNgaynhan = oldDathang.ngaynhan ? new Date(oldDathang.ngaynhan).toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) : 'N/A';
                if (oldNgaynhan !== ngaynhanFormatted) {
                    msg += `- Ngày nhận: <code>${oldNgaynhan}</code> ➡️ <code>${ngaynhanFormatted}</code>\n`;
                }
                const oldProducts = oldDathang.sanpham || [];
                const newProducts = fullDathang.sanpham || [];
                const oldProdMap = new Map(oldProducts.map((p) => [p.idSP || p.id, p]));
                const newProdMap = new Map(newProducts.map((p) => [p.idSP || p.id, p]));
                const added = [];
                const removed = [];
                const changed = [];
                newProducts.forEach((np) => {
                    const npId = np.idSP || np.id;
                    const op = oldProdMap.get(npId);
                    if (!op) {
                        added.push(np);
                    }
                    else {
                        const opQty = Number(op.slnhan ?? op.slgiao ?? op.sldat ?? 0);
                        const npQty = Number(np.slnhan ?? np.slgiao ?? np.sldat ?? 0);
                        if (opQty !== npQty) {
                            changed.push({ product: np, oldQty: opQty, newQty: npQty });
                        }
                    }
                });
                oldProducts.forEach((op) => {
                    const opId = op.idSP || op.id;
                    if (!newProdMap.has(opId)) {
                        removed.push(op);
                    }
                });
                if (added.length > 0) {
                    msg += `➕ <b>Sản phẩm được thêm:</b>\n`;
                    for (const item of added) {
                        const name = item.sanpham?.title || item.title || 'Sản phẩm';
                        const qty = Number(item.slnhan ?? item.slgiao ?? item.sldat ?? 0);
                        msg += `  • ${name}: <b>${qty}</b>\n`;
                    }
                }
                if (removed.length > 0) {
                    msg += `➖ <b>Sản phẩm bị xóa:</b>\n`;
                    for (const item of removed) {
                        const name = item.sanpham?.title || item.title || 'Sản phẩm';
                        msg += `  • ${name}\n`;
                    }
                }
                if (changed.length > 0) {
                    msg += `📝 <b>Thay đổi số lượng:</b>\n`;
                    for (const item of changed) {
                        const name = item.product.sanpham?.title || item.product.title || 'Sản phẩm';
                        msg += `  • ${name}: <code>${item.oldQty}</code> ➡️ <b>${item.newQty}</b>\n`;
                    }
                }
            }
            await this.sendTelegramMessage(msg);
        }
        catch (err) {
            this.logger.error('Error handling dathang event for post-closing monitoring', err.stack);
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map
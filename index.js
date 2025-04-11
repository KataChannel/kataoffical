require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const TonWeb = require('tonweb');

// Cấu hình bot
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Cấu hình TON (testnet)
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
    apiKey: process.env.TON_API_KEY
}));
const MASTER_WALLET_ADDRESS = 'YOUR_MASTER_WALLET_ADDRESS'; // Thay bằng địa chỉ ví TON
const MASTER_WALLET_SEED = 'YOUR_MASTER_WALLET_SEED'; // Thay bằng seed ví (bảo mật)

// Hình ảnh cây (thay bằng link thật)
const cropImages = {
    'truc vang': 'https://i.imgur.com/trucvang.jpg',
    'tre': 'https://i.imgur.com/trexanh.jpg',
    'sen': 'https://i.imgur.com/hoasen.jpg',
    'phuong vi': 'https://i.imgur.com/phuongvi.jpg',
    'lua': 'https://i.imgur.com/lua.jpg',
    'water': 'https://i.imgur.com/water.jpg',
    'harvest': 'https://i.imgur.com/harvest.jpg'
};

// Dữ liệu game
const users = {}; // { user_id: { crops: [], xp: 0, last_water: 0, wallet: null, balance: 0, vip: false, vip_expiry: 0 } }
const crops = {
    'truc vang': { time: 7200, xp: 20, tokenChances: { 0.7: 0.02, 0.2: 0.05, 0.1: 0.1 }, premium: true }, // Kim
    'tre': { time: 3600, xp: 15, tokenChances: { 0.7: 0.01, 0.2: 0.03, 0.1: 0.08 }, premium: false }, // Mộc
    'sen': { time: 10800, xp: 25, tokenChances: { 0.7: 0.015, 0.2: 0.04, 0.1: 0.09 }, premium: true }, // Thủy
    'phuong vi': { time: 14400, xp: 30, tokenChances: { 0.7: 0.02, 0.2: 0.06, 0.1: 0.12 }, premium: true }, // Hỏa
    'lua': { time: 5400, xp: 18, tokenChances: { 0.7: 0.01, 0.2: 0.04, 0.1: 0.07 }, premium: false } // Thổ
};

// Giao diện chính
const mainMenu = {
    inline_keyboard: [
        [{ text: '🌱 Trồng cây', callback_data: 'plant' }],
        [{ text: '💧 Tưới nước', callback_data: 'water' }],
        [{ text: '🌾 Thu hoạch', callback_data: 'harvest' }],
        [{ text: '💸 Kết nối ví TON', callback_data: 'connect_wallet' }],
        [{ text: '📊 Xem trạng thái', callback_data: 'status' }],
        [{ text: '🛒 Mua vật phẩm', callback_data: 'shop' }],
        [{ text: '👑 Mua VIP', callback_data: 'buy_vip' }]
    ]
};

// Danh sách cây để chọn
const plantMenu = {
    inline_keyboard: [
        [{ text: 'Trúc Vàng (Kim) ⭐', callback_data: 'plant_truc vang' }, { text: 'Tre (Mộc)', callback_data: 'plant_tre' }],
        [{ text: 'Sen (Thủy) ⭐', callback_data: 'plant_sen' }, { text: 'Phượng Vĩ (Hỏa) ⭐', callback_data: 'plant_phuong vi' }],
        [{ text: 'Lúa (Thổ)', callback_data: 'plant_lua' }],
        [{ text: 'Quay lại', callback_data: 'back' }]
    ]
};

// Menu cửa hàng
const shopMenu = {
    inline_keyboard: [
        [{ text: 'Hạt Trúc Vàng (0.5 TON)', callback_data: 'buy_truc vang' }],
        [{ text: 'Hạt Sen (0.5 TON)', callback_data: 'buy_sen' }],
        [{ text: 'Hạt Phượng Vĩ (0.5 TON)', callback_data: 'buy_phuong vi' }],
        [{ text: 'Phân bón (0.2 TON)', callback_data: 'buy_fertilizer' }],
        [{ text: 'Quay lại', callback_data: 'back' }]
    ]
};

// Hàm bắt đầu
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendPhoto(chatId, cropImages['lua'], {
        caption: 'Chào mừng đến với Ngũ Hành Farm! Trồng cây, thu hoạch và nhận TON!\n🌟 Tặng bạn 1 cây lúa miễn phí!',
        reply_markup: mainMenu
    });
    const userId = msg.from.id;
    if (!users[userId]) {
        users[userId] = { crops: [{ name: 'lua', planted_at: Date.now() / 1000, time_to_mature: crops['lua'].time }], xp: 0, last_water: 0, wallet: null, balance: 0, vip: false, vip_expiry: 0 };
    }
});

// Hàm xử lý nút
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const userId = query.from.id;
    const data = query.data;

    if (!users[userId]) {
        users[userId] = { crops: [], xp: 0, last_water: 0, wallet: null, balance: 0, vip: false, vip_expiry: 0 };
    }

    if (data === 'plant') {
        bot.editMessageCaption({
            chat_id: chatId,
            message_id: query.message.message_id,
            caption: 'Chọn cây để trồng (⭐ là cây cao cấp):',
            reply_markup: plantMenu
        });
    } else if (data.startsWith('plant_')) {
        const cropName = data.replace('plant_', '');
        if (crops[cropName].premium && users[userId].balance < 0.5) {
            bot.sendMessage(chatId, `Bạn cần 0.5 TON để trồng ${cropName}! Mua tại /shop.`);
            return bot.answerCallbackQuery(query.id);
        }
        if (users[userId].crops.length >= 10) {
            bot.sendMessage(chatId, 'Bạn đã trồng tối đa 10 cây! Thu hoạch bớt trước.');
            return bot.answerCallbackQuery(query.id);
        }
        users[userId].crops.push({
            name: cropName,
            planted_at: Date.now() / 1000,
            time_to_mature: crops[cropName].time
        });
        if (crops[cropName].premium) users[userId].balance -= 0.5;
        bot.editMessageCaption({
            chat_id: chatId,
            message_id: query.message.message_id,
            caption: `Đã trồng ${cropName}! Thời gian trưởng thành: ${crops[cropName].time / 3600} giờ.`,
            reply_markup: mainMenu
        });
        bot.editMessageMedia({
            chat_id: chatId,
            message_id: query.message.message_id,
            media: { type: 'photo', media: cropImages[cropName] }
        });
    } else if (data === 'water') {
        const currentTime = Date.now() / 1000;
        if (!users[userId].crops.length) {
            bot.sendMessage(chatId, 'Bạn chưa trồng cây nào!');
            return bot.answerCallbackQuery(query.id);
        }
        if (!users[userId].vip && currentTime - users[userId].last_water < 1800) {
            bot.sendMessage(chatId, 'Bạn vừa tưới nước, chờ 30 phút nữa nhé! (VIP tưới không giới hạn)');
            return bot.answerCallbackQuery(query.id);
        }
        users[userId].crops.forEach(crop => {
            crop.time_to_mature *= 0.9;
        });
        users[userId].last_water = currentTime;
        bot.editMessageCaption({
            chat_id: chatId,
            message_id: query.message.message_id,
            caption: 'Đã tưới nước! Cây của bạn trưởng thành nhanh hơn 10%.',
            reply_markup: mainMenu
        });
        bot.editMessageMedia({
            chat_id: chatId,
            message_id: query.message.message_id,
            media: { type: 'photo', media: cropImages['water'] }
        });
    } else if (data === 'harvest') {
        const currentTime = Date.now() / 1000;
        const matureCrops = users[userId].crops.filter(crop => currentTime - crop.planted_at >= crop.time_to_mature);

        if (!matureCrops.length) {
            bot.sendMessage(chatId, 'Chưa có cây nào trưởng thành!');
            return bot.answerCallbackQuery(query.id);
        }

        const harvestedCrop = matureCrops[Math.floor(Math.random() * matureCrops.length)];
        const cropName = harvestedCrop.name;
        const xpEarned = users[userId].vip ? crops[cropName].xp * 1.2 : crops[cropName].xp; // VIP +20% XP
        users[userId].xp += xpEarned;
        users[userId].crops = users[userId].crops.filter(c => c !== harvestedCrop);

        const fee = 0.005; // Phí thu hoạch
        if (users[userId].balance < fee) {
            bot.sendMessage(chatId, `Bạn cần 0.005 TON để thu hoạch token! Nạp tại /shop.`);
            return bot.answerCallbackQuery(query.id);
        }

        const tokenChance = Math.random();
        let tokenAmount = 0;
        let cumulative = 0;
        for (const [prob, amount] of Object.entries(crops[cropName].tokenChances)) {
            cumulative += parseFloat(prob);
            if (tokenChance <= cumulative) {
                tokenAmount = amount;
                break;
            }
        }

        let tokenMessage = '';
        if (users[userId].wallet && tokenAmount > 0) {
            try {
                users[userId].balance -= fee;
                const wallet = tonweb.wallet.fromSeed(TonWeb.utils.hexToBytes(MASTER_WALLET_SEED));
                await wallet.methods.transfer({
                    toAddress: users[userId].wallet,
                    amount: TonWeb.utils.toNano(tokenAmount),
                    seqno: await wallet.methods.seqno().call(),
                    payload: `Thu hoạch ${cropName}`
                }).send();
                users[userId].balance += tokenAmount;
                tokenMessage = `và ${tokenAmount} TON (phí ${fee} TON)!`;
            } catch (error) {
                console.error(error);
                tokenMessage = '(lỗi gửi TON, kiểm tra ví).';
            }
        } else {
            tokenMessage = users[userId].wallet ? '(không nhận TON lần này)' : '(chưa kết nối ví TON).';
        }

        bot.editMessageCaption({
            chat_id: chatId,
            message_id: query.message.message_id,
            caption: `Thu hoạch ${cropName} thành công! Nhận ${xpEarned} XP ${tokenMessage}`,
            reply_markup: mainMenu
        });
        bot.editMessageMedia({
            chat_id: chatId,
            message_id: query.message.message_id,
            media: { type: 'photo', media: cropImages['harvest'] }
        });
    } else if (data === 'connect_wallet') {
        bot.sendMessage(chatId, 'Nhập địa chỉ ví TON: /connect_wallet <địa chỉ ví>');
    } else if (data === 'status') {
        let status = `📊 Trạng thái của bạn:\n`;
        status += `XP: ${users[userId].xp}\n`;
        status += `Số dư TON: ${users[userId].balance.toFixed(3)}\n`;
        status += `Ví TON: ${users[userId].wallet || 'Chưa kết nối'}\n`;
        status += `VIP: ${users[userId].vip && users[userId].vip_expiry > Date.now() / 1000 ? 'Kích hoạt' : 'Chưa có'}\n`;
        status += `Cây đang trồng:\n`;
        if (users[userId].crops.length) {
            users[userId].crops.forEach(crop => {
                const timeLeft = crop.time_to_mature - (Date.now() / 1000 - crop.planted_at);
                status += `- ${crop.name}: ${timeLeft > 0 ? Math.ceil(timeLeft / 60) + ' phút nữa' : 'Trưởng thành'}\n`;
            });
        } else {
            status += 'Chưa có cây nào.\n';
        }
        bot.editMessageCaption({
            chat_id: chatId,
            message_id: query.message.message_id,
            caption: status,
            reply_markup: mainMenu
        });
    } else if (data === 'shop') {
        bot.editMessageCaption({
            chat_id: chatId,
            message_id: query.message.message_id,
            caption: 'Cửa hàng vật phẩm:',
            reply_markup: shopMenu
        });
    } else if (data.startsWith('buy_')) {
        const item = data.replace('buy_', '');
        let price = 0;
        let message = '';
        if (['truc vang', 'sen', 'phuong vi'].includes(item)) {
            price = 0.5;
            message = `Đã mua hạt ${item}! Dùng nút "Trồng cây" để trồng.`;
            users[userId].balance -= price;
        } else if (item === 'fertilizer') {
            price = 0.2;
            message = 'Đã mua phân bón! Cây của bạn trưởng thành nhanh hơn 20%.';
            users[userId].crops.forEach(crop => crop.time_to_mature *= 0.8);
            users[userId].balance -= price;
        }
        if (users[userId].balance < price) {
            bot.sendMessage(chatId, 'Số dư TON không đủ! Nạp thêm tại /deposit.');
            return bot.answerCallbackQuery(query.id);
        }
        bot.editMessageCaption({
            chat_id: chatId,
            message_id: query.message.message_id,
            caption: message,
            reply_markup: mainMenu
        });
    } else if (data === 'buy_vip') {
        const price = 1;
        if (users[userId].balance < price) {
            bot.sendMessage(chatId, 'Bạn cần 1 TON để mua VIP! Nạp tại /deposit.');
            return bot.answerCallbackQuery(query.id);
        }
        users[userId].vip = true;
        users[userId].vip_expiry = Date.now() / 1000 + 30 * 24 * 60 * 60;
        users[userId].balance -= price;
        bot.editMessageCaption({
            chat_id: chatId,
            message_id: query.message.message_id,
            caption: 'Đã kích hoạt VIP! Nhận +20% XP, tưới nước không giới hạn trong 30 ngày.',
            reply_markup: mainMenu
        });
    } else if (data === 'back') {
        bot.editMessageCaption({
            chat_id: chatId,
            message_id: query.message.message_id,
            caption: 'Chào mừng đến với Ngũ Hành Farm!',
            reply_markup: mainMenu
        });
        bot.editMessageMedia({
            chat_id: chatId,
            message_id: query.message.message_id,
            media: { type: 'photo', media: cropImages['lua'] }
        });
    }

    bot.answerCallbackQuery(query.id);
});

// Hàm kết nối ví TON
bot.onText(/\/connect_wallet (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const walletAddress = match[1];

    if (!users[userId]) {
        users[userId] = { crops: [], xp: 0, last_water: 0, wallet: null, balance: 0, vip: false, vip_expiry: 0 };
    }

    users[userId].wallet = walletAddress;
    bot.sendMessage(chatId, `Đã kết nối ví TON: ${walletAddress}`, { reply_markup: mainMenu });
});

// Hàm xem trạng thái
bot.onText(/\/status/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!users[userId]) {
        users[userId] = { crops: [], xp: 0, last_water: 0, wallet: null, balance: 0, vip: false, vip_expiry: 0 };
    }

    let status = `📊 Trạng thái của bạn:\n`;
    status += `XP: ${users[userId].xp}\n`;
    status += `Số dư TON: ${users[userId].balance.toFixed(3)}\n`;
    status += `Ví TON: ${users[userId].wallet || 'Chưa kết nối'}\n`;
    status += `VIP: ${users[userId].vip && users[userId].vip_expiry > Date.now() / 1000 ? 'Kích hoạt' : 'Chưa có'}\n`;
    status += `Cây đang trồng:\n`;
    if (users[userId].crops.length) {
        users[userId].crops.forEach(crop => {
            const timeLeft = crop.time_to_mature - (Date.now() / 1000 - crop.planted_at);
            status += `- ${crop.name}: ${timeLeft > 0 ? Math.ceil(timeLeft / 60) + ' phút nữa' : 'Trưởng thành'}\n`;
        });
    } else {
        status += 'Chưa có cây nào.\n';
    }
    bot.sendMessage(chatId, status, { reply_markup: mainMenu });
});

// Hàm nạp TON (giả lập, cần tích hợp cổng thanh toán TON)
bot.onText(/\/deposit (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const amount = parseFloat(match[1]);

    if (!users[userId]) {
        users[userId] = { crops: [], xp: 0, last_water: 0, wallet: null, balance: 0, vip: false, vip_expiry: 0 };
    }

    users[userId].balance += amount;
    bot.sendMessage(chatId, `Đã nạp ${amount} TON vào số dư!`, { reply_markup: mainMenu });
});

// Hàm rút TON
bot.onText(/\/withdraw (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const amount = parseFloat(match[1]);

    if (!users[userId].wallet) {
        return bot.sendMessage(chatId, 'Chưa kết nối ví TON!');
    }
    if (amount <= 0 || users[userId].balance < amount) {
        return bot.sendMessage(chatId, 'Số dư không đủ!');
    }

    const fee = amount * 0.1; // 10% phí
    try {
        const wallet = tonweb.wallet.fromSeed(TonWeb.utils.hexToBytes(MASTER_WALLET_SEED));
        await wallet.methods.transfer({
            toAddress: users[userId].wallet,
            amount: TonWeb.utils.toNano(amount - fee),
            seqno: await wallet.methods.seqno().call(),
            payload: `Rút TON từ Ngũ Hành Farm`
        }).send();
        users[userId].balance -= amount;
        bot.sendMessage(chatId, `Rút ${amount - fee} TON thành công! Phí: ${fee} TON.`, { reply_markup: mainMenu });
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Lỗi rút TON, thử lại sau!', { reply_markup: mainMenu });
    }
});

console.log('Bot is running...');
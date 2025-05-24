/// <reference lib="webworker" />

import { environment } from "../../../environments/environment";

addEventListener('message', async ({ data }) => {
    const items: any[] = data.items;
    console.log("data", data.items);
    for (const item of items) {
        try {
            const response = await fetch(`${environment.APIURL}/hoadonchitiet`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.token}`
                },
                body: JSON.stringify(item)
            });
            const result = await response.json();
            postMessage({ status: 'success', item: result });
        } catch (err: any) {
            postMessage({ status: 'error', error: err.toString(), item });
        }
        // Delay 200ms giữa mỗi lần gọi để tránh tải quá mức
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    postMessage({ status: 'done' });
});
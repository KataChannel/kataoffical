
/// <reference lib="webworker" />
import { openDB } from 'idb';
addEventListener('message', async ({ data }) => {
  const { records, batchId } = data;

  try {
    const db = await openDB('DriveItem', 1, {
      upgrade(db) {
        db.createObjectStore('records', { keyPath: 'id' });
      },
    });

    const tx = db.transaction('records', 'readwrite');
    const store = tx.objectStore('records');

    for (const record of records) {
      await store.put(record);
    }

    await tx.done;
    postMessage({ status: 'success', batchId });
  } catch (error:any) {
    postMessage({ status: 'error', batchId, error: error.message });
  }
});
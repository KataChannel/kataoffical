import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function importData(): Promise<void> {
  try {
    const products = await prisma.mathang.findMany();
    const invoiceDetails = await prisma.hoadonChitiet.findMany();

    for (const product of products) {
      try {
        const relatedInvoices = invoiceDetails.filter(
          (invoice) => invoice.title === product.title
        );

        if (relatedInvoices.length === 0) {
          console.info(
            `ℹ️ No matching hoadonChitiet found for mathang with title ${product.title}.`
          );
          continue;
        }

        const totalCost = relatedInvoices.reduce((sum, invoice:any) => sum + invoice.dgia, 0);
        const totalQuantity = relatedInvoices.reduce((sum, invoice:any) => sum + invoice.sluong, 0);

        // Avoid division by zero
        if (totalQuantity === 0) {
          console.warn(
            `⚠️ Total quantity is 0 for mathang with title ${product.title}. Skipping update.`
          );
          continue;
        }

        const giavon = totalCost / totalQuantity;

        await prisma.mathang.update({
          where: { id: product.id },
          data: { giavon },
        });
        console.log(`✅ Updated mathang entry with title: ${product.title}`);
      } catch (error: any) {
        console.error(
          `⚠️ Error updating mathang with ID ${product.id} and title ${product.title}: ${error.message}`
        );
      }
    }

    console.log('✅ Completed updating hoadonChitiet titles!');
  } catch (error: any) {
    console.error('⚠️ Error importing data:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

importData();

export function removeVietnameseAccents(text: string): string {
  if (!text) {
    return "";
  }
  return text
    .normalize("NFD")
    .replace(/đ/g, "d")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

export function toSnakeCase(text: string): string {
  return removeVietnameseAccents(text)
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\W+/g, "_")
    .toLowerCase();
}

export function toKebabCase(text: string): string {
  return removeVietnameseAccents(text)
    .replace(/\s+/g, "-")
    .toLowerCase();
}
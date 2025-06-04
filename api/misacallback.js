const fs = require('fs');
const path = require('path');

// Define the base directory for the source files
const srcDir = path.join(__dirname, 'callback');

// Define the file structure and content
const files = [
  {
    path: 'callback/enums/callback-data-type.enum.ts',
    content: `
export enum CallBackDataType {
  None = 0,
  SaveVoucher = 1,
  DeleteVoucher = 2,
  UpdateDocumentRef = 4,
  UpdateTaxInfoASP = 5,
}
    `,
  },
  {
    path: 'callback/dto/callback-data-input.dto.ts',
    content: `
export class CallbackDataInput {
  success: boolean;
  error_code?: string;
  error_message: string = '';
  signature: string;
  data_type: number;
  data: string;
  org_company_code: string;
  app_id: string;
}
    `,
  },
  {
    path: 'callback/dto/callback-data-output.dto.ts',
    content: `
export class CallbackDataOutput {
  Success: boolean = true;
  ErrorCode?: string;
  ErrorMessage: string = '';
  Data?: string;
}
    `,
  },
  {
    path: 'callback/dto/callback-data-detail.dto.ts',
    content: `
export class CallbackDataDetail {
  org_refid: string;
  success: boolean;
  error_code?: string;
  error_message: string = '';
  session_id?: string;
  error_call_back_message?: string;
  voucher_type?: number;
}
    `,
  },
  {
    path: 'callback/callback.service.ts',
    content: `
import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import { CallbackDataInput } from './dto/callback-data-input.dto';
import { CallbackDataOutput } from './dto/callback-data-output.dto';
import { CallbackDataDetail } from './dto/callback-data-detail.dto';
import { CallBackDataType } from './enums/callback-data-type.enum';

@Injectable()
export class CallbackService {
  private readonly appId = '0e0a14cf-9e4b-4af9-875b-c490f34a581b'; // Replace with your MISA-provided app_id

  async processCallback(param: CallbackDataInput): Promise<CallbackDataOutput> {
    const result = new CallbackDataOutput();

    try {
      // Validate signature
      const signature = this.generateSHA256HMAC(param.data || '', this.appId);
      if (signature !== param.signature) {
        result.Success = false;
        result.ErrorCode = 'InvalidParam';
        result.ErrorMessage = 'Signature invalid';
        return result;
      }

      // Process callback in a non-blocking way
      this.doCallBackData(param).catch((err) =>
        console.error('Error processing callback:', err),
      );
    } catch (ex) {
      result.Success = false;
      result.ErrorCode = 'Exception';
      result.ErrorMessage = ex.message;
    }

    return result;
  }

  private async doCallBackData(param: CallbackDataInput): Promise<void> {
    if (!param) return;

    // Save callback data (implement your storage logic)
    this.saveCallBack(param);

    switch (param.data_type) {
      case CallBackDataType.SaveVoucher:
      case CallBackDataType.DeleteVoucher:
        const data: CallbackDataDetail[] = param.data
          ? JSON.parse(param.data)
          : [];
        if (data && data.length > 0) {
          for (const item of data) {
            // Update status for each org_refid (implement your logic)
            console.log(\`Processing org_refid: \${item.org_refid}\`);
          }
        }
        break;
      default:
        break;
    }

    // Delete callback after processing (implement your storage logic)
    this.deleteCallBack(param);
  }

  private saveCallBack(param: CallbackDataInput): void {
    // Implement storage logic (e.g., save to DB or file)
    console.log('Saving callback:', param);
  }

  private deleteCallBack(param: CallbackDataInput): void {
    // Implement deletion logic (e.g., remove from DB or file)
    console.log('Deleting callback:', param);
  }

  private generateSHA256HMAC(input: string, key: string): string {
    input = input || '';
    const hmac = createHmac('sha256', key);
    hmac.update(input);
    return hmac.digest('hex').toLowerCase();
  }
}
    `,
  },
  {
    path: 'callback/callback.controller.ts',
    content: `
import { Controller, Post, Body } from '@nestjs/common';
import { CallbackService } from './callback.service';
import { CallbackDataInput } from './dto/callback-data-input.dto';
import { CallbackDataOutput } from './dto/callback-data-output.dto';

@Controller('actopensupport')
export class CallbackController {
  constructor(private readonly callbackService: CallbackService) {}

  @Post('call_back_data_demo')
  async callBackData(@Body() param: CallbackDataInput): Promise<CallbackDataOutput> {
    return this.callbackService.processCallback(param);
  }
}
    `,
  },
  {
    path: 'callback/callback.module.ts',
    content: `
import { Module } from '@nestjs/common';
import { CallbackController } from './callback.controller';
import { CallbackService } from './callback.service';

@Module({
  controllers: [CallbackController],
  providers: [CallbackService],
})
export class CallbackModule {}
    `,
  },
  {
    path: 'app.module.ts',
    content: `
import { Module } from '@nestjs/common';
import { CallbackModule } from './callback/callback.module';

@Module({
  imports: [CallbackModule],
})
export class AppModule {}
    `,
  },
];

// Function to create directories and files
function createFiles() {
  files.forEach((file) => {
    const filePath = path.join(srcDir, file.path);
    const dir = path.dirname(filePath);

    // Create directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true });

    // Write file content
    fs.writeFileSync(filePath, file.content.trim(), 'utf8');
    console.log(`Created: ${filePath}`);
  });
}

// Function to check and update package.json dependencies
function updatePackageJson() {
  const packageJsonPath = path.join(__dirname, 'package.json');
  let packageJson;

  try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  } catch (err) {
    console.error('Error reading package.json:', err.message);
    return;
  }

  // Define required dependencies
  const dependencies = {
    '@nestjs/common': '^10.0.0',
    '@nestjs/core': '^10.0.0',
    '@nestjs/platform-express': '^10.0.0',
    crypto: '^1.0.1',
  };

  // Define dev dependencies
  const devDependencies = {
    '@types/node': '^20.0.0',
  };

  // Update dependencies
  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...dependencies,
  };

  // Update devDependencies
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    ...devDependencies,
  };

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
  console.log('Updated package.json with required dependencies');
}

// Main execution
function main() {
  try {
    // Create src directory if it doesn't exist
    fs.mkdirSync(srcDir, { recursive: true });

    // Create all files
    createFiles();

    // Update package.json
    updatePackageJson();

    console.log('All files created successfully!');
    console.log('Next steps:');
    console.log('1. Run `npm install` to install dependencies.');
    console.log('2. Run `npm run start:dev` to start the NestJS application.');
  } catch (err) {
    console.error('Error creating files:', err.message);
  }
}

main();
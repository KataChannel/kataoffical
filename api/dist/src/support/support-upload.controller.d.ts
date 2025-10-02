export declare class SupportUploadController {
    uploadFiles(files: Express.Multer.File[]): {
        fileName: string;
        fileType: string;
        fileSize: number;
        fileUrl: string;
    }[];
}

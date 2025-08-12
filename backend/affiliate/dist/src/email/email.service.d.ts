export declare class EmailService {
    private transporter;
    constructor();
    sendPasswordResetEmail(to: string, resetToken: string, userName?: string): Promise<void>;
    private generatePasswordResetTemplate;
    sendWelcomeEmail(to: string, userName: string, tempPassword?: string): Promise<void>;
    private generateWelcomeTemplate;
}

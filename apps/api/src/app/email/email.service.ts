import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {}

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${this.configService.get('FRONTEND_URL')}/verify-email?token=${token}`;

    // In a real application, you would integrate with an email service like:
    // - SendGrid
    // - AWS SES
    // - Nodemailer with SMTP
    // - Mailgun

    this.logger.log(`Sending verification email to ${email}`);
    this.logger.log(`Verification URL: ${verificationUrl}`);

    // For now, we'll just log the email content
    // Replace this with actual email sending logic
    const emailContent = {
      to: email,
      subject: 'Verify Your Email - Rent Easy 9ja',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7e22ce;">Welcome to Rent Easy 9ja!</h2>
          <p>Thank you for registering with us. Please click the button below to verify your email address:</p>
          <a href="${verificationUrl}"
             style="background-color: #7e22ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0;">
            Verify Email
          </a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create an account with us, please ignore this email.</p>
        </div>
      `,
    };

    // TODO: Implement actual email sending
    this.logger.log(`Email content: ${JSON.stringify(emailContent, null, 2)}`);
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;

    this.logger.log(`Sending password reset email to ${email}`);
    this.logger.log(`Reset URL: ${resetUrl}`);

    const emailContent = {
      to: email,
      subject: 'Reset Your Password - Rent Easy 9ja',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7e22ce;">Password Reset Request</h2>
          <p>You requested to reset your password. Click the button below to set a new password:</p>
          <a href="${resetUrl}"
             style="background-color: #7e22ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0;">
            Reset Password
          </a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, please ignore this email.</p>
        </div>
      `,
    };

    // TODO: Implement actual email sending
    this.logger.log(`Email content: ${JSON.stringify(emailContent, null, 2)}`);
  }

  async sendApplicationNotification(
    landlordEmail: string,
    tenantName: string,
    propertyTitle: string
  ): Promise<void> {
    this.logger.log(`Sending application notification to ${landlordEmail}`);

    const emailContent = {
      to: landlordEmail,
      subject: 'New Property Application - Rent Easy 9ja',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7e22ce;">New Property Application</h2>
          <p>You have received a new application for your property:</p>
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0; color: #374151;">Property: ${propertyTitle}</h3>
            <p style="margin: 8px 0; color: #6b7280;">Applicant: ${tenantName}</p>
          </div>
          <p>Please log in to your dashboard to review the application and respond to the tenant.</p>
          <a href="${this.configService.get('FRONTEND_URL')}/dashboard"
             style="background-color: #7e22ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0;">
            View Application
          </a>
        </div>
      `,
    };

    // TODO: Implement actual email sending
    this.logger.log(`Email content: ${JSON.stringify(emailContent, null, 2)}`);
  }
}

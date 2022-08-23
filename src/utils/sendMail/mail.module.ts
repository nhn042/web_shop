
import { SendMailService } from './mail.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    providers: [SendMailService],
    controllers: [],
    exports: [SendMailService],
})
export class SendMailModule{}
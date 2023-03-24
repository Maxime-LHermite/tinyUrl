import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { TinyUrlModule } from './tiny-url/tiny-url.module';
import { TinyUrl } from './tiny-url/tiny-url.entity';
import { RedirectModule } from './redirect/redirect.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [User, TinyUrl],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        TinyUrlModule,
        RedirectModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

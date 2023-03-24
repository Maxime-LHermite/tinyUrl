import { IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateTinyUrlDto {
    @IsNotEmpty()
    @IsUrl()
    url: string;

    @IsNotEmpty()
    @IsOptional()
    urlName: string | undefined;
}

export class UpdateTinyUrlDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsOptional()
    @IsUrl()
    url: string | undefined;

    @IsNotEmpty()
    @IsOptional()
    urlName: string | undefined;
}

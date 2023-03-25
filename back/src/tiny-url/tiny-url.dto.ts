import { IsNotEmpty, IsUrl, IsOptional, ValidateIf, IsAlphanumeric } from 'class-validator';

export class CreateTinyUrlDto {
    @IsNotEmpty()
    @IsUrl({ require_protocol: true })
    url: string;

    @IsNotEmpty()
    @IsOptional()
    @IsAlphanumeric()
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
    @IsAlphanumeric()
    urlName: string | undefined;
}

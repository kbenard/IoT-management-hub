import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  IsArray,
  IsBoolean,
  IsEAN,
  IsIP,
  isSemVer
} from 'class-validator';

// TODO: Refine 

export class DeviceDto {
  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @IsString()
  type: string;
}
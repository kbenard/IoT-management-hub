import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class DeviceDto {
    @IsNotEmpty()
    @IsString()
    _id: string;
  }
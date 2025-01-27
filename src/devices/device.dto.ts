import {
  ValidateNested,
  IsString, IsNumber, IsInt, IsBoolean,
  IsArray, IsObject,
  IsNotEmpty, IsEAN, IsIP, isSemVer,
  IsSemVer,
} from 'class-validator';
import { Type } from 'class-transformer';

export class NetworkDto {
  @IsBoolean()
  required: boolean;

  @IsBoolean()
  connected: boolean;
}

export class BatteryDto {
  @IsInt()
  percentage: number;
}

export class PowerDto {
  @ValidateNested()
  @Type(() => NetworkDto)
  network: NetworkDto;

  @ValidateNested()
  @Type(() => BatteryDto)
  battery: BatteryDto;
}

export class StatusDto {
  @IsString()
  code: string;

  @IsNumber()
  lastUpdateReceived: number;

  @IsString()
  message: string;

  @ValidateNested()
  @Type(() => PowerDto)
  power: PowerDto;
}

export class FirmwareDto {
  @IsString()
  name: string;

  @IsString()
  @IsSemVer()
  version: string;
}

export class DeviceInfoDto {
  @IsString()
  referenceModel: string;

  @IsString()
  manufacturerId: string;

  @IsNumber()
  @IsEAN()
  ean: number;

  @ValidateNested()
  @Type(() => FirmwareDto)
  firmware: FirmwareDto;
}

export class GeodataDto {
  @IsString()
  homeId: string;

  @IsString()
  placement: string;
  
  @IsString()
  @IsIP()
  IP: string;
}

export class SensorDto {
  @IsString()
  id: string;

  @IsString()
  metric: string;

  @IsString()
  unit: string;

  @IsNumber()
  value: number;
}

export class IndicatorDto {
  @IsString()
  id: string;

  @IsString()
  type: string;

  @IsBoolean()
  active: boolean;
}

export class MetadataDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SensorDto)
  sensors: SensorDto[];


  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IndicatorDto)
  indicators: IndicatorDto[];
}

// TODO: Complete DTO
export class DeviceDto {
  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @ValidateNested()
  @Type(() => StatusDto)
  status: StatusDto;

  @ValidateNested()
  @Type(() => DeviceInfoDto)
  device: DeviceInfoDto;

  @ValidateNested()
  @Type(() => GeodataDto)
  geodata: GeodataDto;

  @ValidateNested()
  @Type(() => MetadataDto)
  metadata: MetadataDto;
}
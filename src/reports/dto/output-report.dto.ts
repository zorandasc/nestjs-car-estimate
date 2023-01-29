import { Expose, Transform } from 'class-transformer';

export class OutputReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  mileage: number;

  //TRANSFORM ORIGINAL REPORT ENTITY obj TO WHAT WE WANT
  @Transform(({ obj }) => {
    return obj.user.id;
  })
  @Expose()
  userId: number;

  @Expose()
  approved: boolean;
}

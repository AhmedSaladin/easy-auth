import { Expose } from 'class-transformer';

export default class Login {
  @Expose()
  token: string;
}

export interface IClient {
  id: string;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  service: string;
  nextAppt?: Date;
}
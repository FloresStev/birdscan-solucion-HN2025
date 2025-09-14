export class PayloadEntity{
    sub: string;
    email: string;
    role: 'USER' | 'ADMIN' | 'GUIDE';
}
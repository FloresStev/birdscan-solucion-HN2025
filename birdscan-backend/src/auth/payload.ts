export class PayloadEntity {
    sub: string; // id del usuario
    email: string;
    role: 'USER' | 'ADMIN' | 'GUIDE';

    firstName?: string;
    lastName?: string;
    userName?: string;
    picture?: string;
}

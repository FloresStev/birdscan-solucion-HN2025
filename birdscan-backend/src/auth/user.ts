export class UserEntity{
    id: string;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    role:  'USER' | 'ADMIN' | 'GUIDE';
    cellphone_number?: string;
    createAt: Date;
    updateAt: Date;
}
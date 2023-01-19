export function isMongoError(error: any) {
    return error.name.includes('Mongo');
}
export function getMessageFromCodeError(code: number) {
    switch (code) {
        case 11000:
            return 'Email already register';
        default:
            return 'Unknow error database';
    }
}
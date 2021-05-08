/*eslint-disable*/
class User {
    name: string;

    nickname: string;

    password: string;

    roles: [];
    avatar: string

    sex: string;

    zip_code: string;

    birthday: string;

    phone: string;

    regtime: string;

    rememberMe: boolean

    constructor(options) {
        const { name, nickname, password, roles = [], avatar = "", sex = "male", zip_code = "111111", phone = "13956950414", birthday = "2000-01-01", regtime = "2021-01-01", rememberMe = false } = options;
        this.name = name;
        this.nickname = nickname;
        this.password = password;
        this.roles = roles;
        this.sex = sex;
        this.phone = phone;
        this.regtime = regtime;
        this.birthday = birthday
        this.zip_code = zip_code;
        this.rememberMe = rememberMe;
        this.avatar = avatar;
        // const filePlugin = window['plugin'].file;
        // filePlugin.getRootDirEntry().then(async (rootEntry) => {
        //     const array = avatar.split('/');
        //     const imageName = array.pop()
        //     filePlugin.getFileEntry('images', imageName).then((fileEntry) => {
        //         fileEntry.file((file) => {
        //             const filePath = window.URL.createObjectURL(file);
        //             this.avatar = filePath;
        //         })
        //     })
        // })
    }
}
function validUser(user) {
    let error;
    let status = 1;
    //@ts-ignore
    if (user.name == "") {
        status = 0;
        error = "用户名不能为空"
    }
    //@ts-ignore
    if (![0, 1].includes(user.sex)) {
        status = 0;
        error = "性别格式错误"
    }
    //@ts-ignore
    if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(user.tel)) {
        status = 0;
        error = "手机号格式错误"
    }
    return { status, error }
}
export { validUser }
export default User;






// class User{
//     private _name: string;
//     public get name(): string {
//         return this._name;
//     }
//     public set name(value: string) {
//         this._name = value;
//     }
//     private _password: string;
//     public get password(): string {
//         return this._password;
//     }
//     public set password(value: string) {
//         this._password = value;
//     }
//     private _authority: number;
//     public get authority(): number {
//         return this._authority;
//     }
//     public set authority(value: number) {
//         this._authority = value;
//     }
//     private _headshot: string;
//     public get headshot(): string {
//         return this._headshot;
//     }
//     public set headshot(value: string) {
//         this._headshot = value;
//     }
//     private _sex: boolean;
//     public get sex(): boolean {
//         return this._sex;
//     }
//     public set sex(value: boolean) {
//         this._sex = value;
//     }
//     private _hometown: string;
//     public get hometown(): string {
//         return this._hometown;
//     }
//     public set hometown(value: string) {
//         this._hometown = value;
//     }
//     private _birthday: Date;
//     public get birthday(): Date {
//         return this._birthday;
//     }
//     public set birthday(value: Date) {
//         this._birthday = value;
//     }
//     private _tel: string;
//     public get tel(): string {
//         return this._tel;
//     }
//     public set tel(value: string) {
//         this._tel = value;
//     }
//     constructor(options){
//         const {name,password,authority,headshot,sex,hometown,tel,birthday} =options;
//         this._name=name;
//         this._password=password;
//         this._authority=authority;
//         this._headshot=headshot;
//         this._sex=sex;
//         this._tel=tel;
//         this._birthday=new Date(birthday)
//         this._hometown=hometown;
//     }
// }
// export default User;
const NativeStorage= window['NativeStorage'];
import User from "../../server/table/User"
import mobileStore from "../../store/index"
function loginSubmit(name,password){

}
function registerSubmit(options){

}
function readStorageUser(){
    let user =null;
    return  new Promise((resolve,reject)=>{
        NativeStorage.getItem('user',(value)=>{
            resolve(value)
        },(fail)=>{
            reject(fail)
        })
    });
}
function saveStorageUser(user:User){
    return  new Promise((resolve,reject)=>{
        NativeStorage.setItem('user',(value)=>{
            resolve(true)
        },(fail)=>{
            reject(fail)
        })
    });
} 
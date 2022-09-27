const GroupModel = require("../models").groups;

class Groups {
    create(body){
        return new Promise((resolve,reject)=>{
            let {email,title} = body
            if(title == "" || title == null || typeof title == 'undefined'){
                reject({code:400,status:"Bad Request",message:"title cannot be null",data:{}})
            }else{
                GroupModel.create({
                    email : email,
                    title : title
                })
                .then((res)=>{
                    GroupModel.findOne({
                        where : {
                            id : res.id,
                        }
                    }).then((resNew)=>{
                        if(resNew){
                            resolve(resNew)
                        }else{
                            reject({code:404,status:"Not Found",message:`Activity with ID ${id} Not Found`,data:{}})
                        }
                    })
                    .catch((e)=>{
                        reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
                    })
                })
                .catch((e)=>{
                    reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
                })
            }
        })
    }
    items(){
        return new Promise((resolve,reject)=>{
            GroupModel.findAll()
            .then((res)=>resolve(res))
            .catch((e)=>{
                reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
            })
        })
    }
    item({id}){
        return new Promise((resolve,reject)=>{
            GroupModel.findOne({
                where : {
                    id : id,
                }
            }).then((res)=>{
                if(res){
                    resolve(res)
                }else{
                    reject({code:404,status:"Not Found",message:`Activity with ID ${id} Not Found`,data:{}})
                }
            })
            .catch((e)=>{
                reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
            })
        })
    }
    update({id},body){
        return new Promise((resolve,reject)=>{
            let {email,title} = body
            if(title == "" || title == null || typeof title == 'undefined'){
                reject({code:400,status:"Bad Request",message:"title cannot be null",data:{}})
            }else{
                GroupModel.findOne({
                    where : {
                        id : id,
                    }
                }).then((res)=>{
                    if(res){
                        let dataUpdate = {
                            title : title
                        }
                        if(email == "" || email == null || typeof email == 'undefined'){
                            dataUpdate.email = res.email
                        }else{
                            dataUpdate.email = email
                        }
                        res.update(dataUpdate)
                        .then((res)=>{
                            GroupModel.findOne({
                                where : {
                                    id : res.id,
                                }
                            }).then((resNew)=>{
                                if(resNew){
                                    resolve(resNew)
                                }else{
                                    reject({code:404,status:"Not Found",message:`Activity with ID ${id} Not Found`,data:{}})
                                }
                            })
                            .catch((e)=>{
                                reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
                            })
                        })
                        .catch((e)=>{
                            reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
                        })
                    }else{
                        reject({code:404,status:"Not Found",message:`Activity with ID ${id} Not Found`,data:{}})
                    }
                })
                .catch((e)=>{
                    reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
                })
            }
        })
    }
    remove({id}){
        return new Promise((resolve,reject)=>{
            GroupModel.findOne({
                where : {
                    id : id,
                }
            }).then((resNew)=>{
                if(resNew){
                    GroupModel.destroy({
                        where: {
                          id: id
                        }
                    })
                    .then((res)=>{
                        resolve(res);
                    })
                    .catch((e)=>{
                        reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
                    })
                }else{
                    reject({code:404,status:"Not Found",message:`Activity with ID ${id} Not Found`,data:{}})
                }
            })
            .catch((e)=>{
                reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
            })
        });
    }
}
module.exports = new Groups;
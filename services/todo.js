const TodoModel = require("../models").todos;
const GroupModel = require("../models").groups;

class Todos{
    create(body){
        return new Promise((resolve,reject)=>{
            let {activity_group_id,title,priority} = body
            if(title == "" || title == null || typeof title == 'undefined'){
                reject({code:400,status:"Bad Request",message:"title cannot be null",data:{}})
            }else if(activity_group_id == "" || activity_group_id == null || typeof activity_group_id == 'undefined'){
                reject({code:400,status:"Bad Request",message:"activity_group_id cannot be null",data:{}})
            }else{
                GroupModel.findOne({
                    where : {
                        id : activity_group_id,
                    }
                }).then((res)=>{
                    if(res){
                        TodoModel.create({
                            activity_group_id : activity_group_id,
                            title : title,
                            priority : (priority == "" || priority == null || typeof priority == 'undefined') ? 'very-high' : priority,
                            is_active : true
                        })
                        .then((res)=>{
                            TodoModel.findOne({
                                where : {
                                    id : res.id,
                                }
                            }).then((resNew)=>{
                                if(resNew){
                                    resolve(resNew)
                                }else{
                                    reject({code:404,status:"Not Found",message:`To do with ID ${activity_group_id} Not Found`,data:{}})
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
                        reject({code:404,status:"Not Found",message:`Activity with ID ${activity_group_id} Not Found`,data:{}})
                    }
                })
                .catch((e)=>{
                    reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
                })
            }
        })
    }
    items({activity_group_id}){
        return new Promise((resolve,reject)=>{
            let where = {
                is_active : true
            }
            if(!(activity_group_id == "" || activity_group_id == null || typeof activity_group_id == 'undefined')){
                where.activity_group_id = activity_group_id
            }
            TodoModel.findAll({
                where:where
            })
            .then((res)=>resolve(res))
            .catch((e)=>{
                reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
            })
        })
    }
    item({id}){
        return new Promise((resolve,reject)=>{
            TodoModel.findOne({
                where : {
                    id : id,
                }
            }).then((res)=>{
                if(res){
                    resolve(res)
                }else{
                    reject({code:404,status:"Not Found",message:`Todo with ID ${id} Not Found`,data:{}})
                }
            })
            .catch((e)=>{
                reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
            })
        })
    }
    update({id},body){
        return new Promise((resolve,reject)=>{
            let {priority,title} = body
            if(title == "" || title == null || typeof title == 'undefined'){
                reject({code:400,status:"Bad Request",message:"title cannot be null",data:{}})
            }else{
                TodoModel.findOne({
                    where : {
                        id : id,
                    }
                }).then((res)=>{
                    if(res){
                        let dataUpdate = {
                            title : title
                        }
                        if(priority == "" || priority == null || typeof priority == 'undefined'){
                            dataUpdate.priority = res.priority
                        }else{
                            dataUpdate.priority = priority
                        }
                        res.update(dataUpdate)
                        .then((res)=>{
                            TodoModel.findOne({
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
                        reject({code:404,status:"Not Found",message:`Todo with ID ${id} Not Found`,data:{}})
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
            TodoModel.findOne({
                where : {
                    id : id,
                }
            }).then((resNew)=>{
                if(resNew){
                    TodoModel.destroy({
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
                    reject({code:404,status:"Not Found",message:`Todo with ID ${id} Not Found`,data:{}})
                }
            })
            .catch((e)=>{
                reject({code:400,status:"Bad Request",message:"some problem on our server! "+e,data:{}})
            })
        });
    }
}

module.exports = new Todos;
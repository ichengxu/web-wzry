const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type:String
    },
    parent:{
        type:mongoose.SchemaTypes.ObjectId,
        //=>表示它是数据库里面的id
        // ref:"Category"
        //=>关联的模型
    }
})
//mongoose添加和设置虚拟属性，但是这虚拟属性的值不会保存到数据库中 ref为关联项 foreignField为外键
schema.virtual("children",{
    localField:"_id",
    foreignField:"parent",
    justOne:false,
    ref:'Category'
})
schema.virtual("newList",{
    localField:"_id",
    foreignField:"categories",
    justOne:false,
    ref:'Article'
})
module.exports = mongoose.model('Category',schema)
const mongoose = require("mongoose")


const connectionrequiestSchema = new mongoose.Schema({

    fromRequest : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    toRequest : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    connectionStatus : {
        type : String,
        enum : {
            values : ["ignore","accepted","interested","rejected"],
            message : `{values} is not supported`
        }
    }
},
{
    timestamps : true
})
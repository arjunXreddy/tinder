const mongoose = require("mongoose")


const connectionrequestSchema = new mongoose.Schema({

    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    toUserId : {
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

connectionrequestSchema.index({
    fromRequest : 1,
    toUserId : 1
})

connectionrequestSchema.pre("save",function (next) {
    const connectionrequest = this;
    if(connectionrequest.fromUserId.equals(toUserId)){
        throw new Error("can not send request to yourself!!")
    }
})

mongoose.export = mongoose.model("connectionrequest",connectionrequestSchema)
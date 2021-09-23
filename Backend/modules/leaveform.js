const mongoose = require('mongoose')

const LeaveformSchema = new mongoose.Schema({
    from:{
        type:String,
        required:[true]
    },
    email:{
        type:String,
        required:[true]
    },
    leavetype:{
        type: String,
        required:[true]
    },
    subject:{
        type: String,
        required:[true]
    },
    reason:{
        type: String,
        required:[true]
    },
    startdate:{
        type: String,
        required:[true]
    },
    enddate:{
        type: String,
        required:[true]
    },
    status:{
        type: String,
    },
    numberofdays:{
        type:String,
    }
})

module.exports = mongoose.model("allleaves",LeaveformSchema)
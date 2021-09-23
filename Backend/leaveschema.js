const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var leaveletterschema = new Schema({
    date            :    String,
    subject         :    String,
    your_name       :    String,
    id              :    String,
    reason          :    String,
    start_date      :    String,
    end_date        :    String,
    manager_name    :    String,
    status          :    String
}) 

module.exports = mongoose.model('requesttable',leaveletterschema)
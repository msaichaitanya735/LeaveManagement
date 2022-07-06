const Leaveform = require('../modules/leaveform')

exports.requestleave = async(req,res,next)=>{
    const {from,email,leavetype, subject, reason, startdate, enddate}= req.body;
    var start = new Date(startdate)
    var end = new Date(enddate)
    var days = Math.abs(start.getDate( )-end.getDate( )+1)
    console.log(days)
    try {
        const leaverequest = await Leaveform.create({
            from,email,leavetype, subject, reason, startdate, enddate,
            status:'pending',
            numberofdays:days
        })
        if(!from||!email||!leavetype||!subject|| !reason||!startdate||!enddate){
            res.send(404).json({
                success: false,
                error: "Provide all the detials"
            })
        }
        res.status(200).json({
            success:true,
            Request: 'Placed',
            status: this.status
        })
    } catch (error) {
        res.status(404).json({
            success:false,
            error: error.message
        })
    }
}

exports.getallleaves = async(req,res,next)=>{
    const allleave = await Leaveform.find()
    res.send(allleave)
}

exports.getpending = async(req,res,next)=>{
    const pending = await Leaveform.find({status:'pending'})
    res.send(pending)
}

exports.getapproved = async(req,res,next)=>{
    const approved = await Leaveform.find({status:'Approved'||'approved'})
    res.send(approved)
}

exports.viewrequest = async(req,res,next)=>{
    const id = req.query.id
    const request = await Leaveform.find({_id:id})
    res.send(request)
}

exports.myleaves = async(req,res,next)=>{
    const email = req.query.email
    const myleave = await Leaveform.find({email:email})
    res.send(myleave)
}

exports.myapprovedleaves = async(req,res,next)=>{
    const email = req.query.email
    const myleave = await Leaveform.find({email:email}&&{status:'Approved'})
    res.send(myleave)
}

exports.mypendingleaves = async(req,res,next)=>{
    const email = req.query.email
    const myleave = await Leaveform.find({email:email}&&{status:'pending'})
    res.send(myleave)
}

exports.respondrequest = async(req,res,next)=>{
    const id = req.query.id
    const respond = await Leaveform.findByIdAndUpdate({_id:id},
        {
            from        :req.body.from     ,     
            email       :req.body.email    ,
            leavetype   :req.body.leavetype,
            subject     :req.body.subject  ,
            reason      :req.body.reason   ,
            startdate   :req.body.startdate,
            enddate     :req.body.enddate  ,
            status      :req.body.status   
        })
    
        respond.save()
        res.send(respond)
}
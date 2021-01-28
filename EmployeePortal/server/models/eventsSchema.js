import mongoose from 'mongoose';


const eventsSchema = mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  venue:String,
  desc: String,
  img: String,
  status :{
    type:String,
    default: 'pending',
  }, 
},  { timestamps: true });

const events = mongoose.model('events', eventsSchema);

export default events;

import mongoose from 'mongoose';

const today = new Date();


const eventsSchema = mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  venue:String,
  desc: String,
  img: String,
  postedDate:{
    type:Date,
    default: today,
  },
  status :{
    type:String,
    default: 'pending',
  }, 
});

const events = mongoose.model('events', eventsSchema);

export default events;

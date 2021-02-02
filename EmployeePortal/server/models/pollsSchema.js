import mongoose from 'mongoose';
const schema = mongoose.Schema;

const OptionSchema = mongoose.Schema({
  option: {
    type:String,
    unique:true,
  },
  votes: {
    type:Number,
    default:0,
  },
  employeeId:{ 
    type: [schema.Types.ObjectId],
    ref: "employeeSchema",
  },  
},
  {timestamps: true}
);

const pollsSchema = mongoose.Schema({
  question: {
    type:String,
    unique:true,
  },
  options: [OptionSchema],
  deadline:Date,
  title:String,
  employeeId:{ 
    type: [schema.Types.ObjectId],
    ref: "employeeSchema",
  },
},
{timestamps: true}
);

const polls = mongoose.model('polls', pollsSchema);

export default polls;
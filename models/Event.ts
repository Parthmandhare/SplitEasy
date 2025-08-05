import mongoose from 'mongoose'

const ParticipantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  avatar: { type: String },
  color: { type: String, required: true }
})

const ExpenseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  paidBy: { type: String, required: true },
  splitBetween: [{ type: String, required: true }],
  category: { type: String, required: true },
  date: { type: String, required: true },
  notes: { type: String }
})

const EventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  type: { 
    type: String, 
    required: true,
    enum: ['trip', 'dinner', 'picnic', 'party', 'other']
  },
  createdAt: { type: String, required: true },
  participants: [ParticipantSchema],
  expenses: [ExpenseSchema]
}, {
  timestamps: true
})

export default mongoose.models.Event || mongoose.model('Event', EventSchema)
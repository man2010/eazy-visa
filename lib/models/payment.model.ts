import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  bookingId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  paymentMethod: 'wave' | 'orange' | 'card' | 'cash';
  paymentReference?: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  providerResponse?: any;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'XOF',
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['wave', 'orange', 'card', 'cash'],
  },
  paymentReference: {
    type: String,
    unique: true,
    sparse: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
  providerResponse: {
    type: Schema.Types.Mixed,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', paymentSchema);
import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  bookingReference: string;
  amadeusOrderId?: string;
  flightOffer: any;
  travelers: any;
  contacts: any;
  totalPrice: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: 'wave' | 'orange' | 'card' | 'cash';
  paymentReference?: string;
  bookingStatus: 'pending' | 'pending_payment' | 'confirmed' | 'cancelled';
  emailSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>({
  bookingReference: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  amadeusOrderId: {
    type: String,
  },
  flightOffer: {
    type: Schema.Types.Mixed,
    required: true,
  },
  travelers: {
    type: Schema.Types.Mixed,
    required: true,
  },
  contacts: {
    type: Schema.Types.Mixed,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'XOF',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['wave', 'orange', 'card', 'cash'],
  },
  paymentReference: {
    type: String,
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'pending_payment', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  emailSent: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);
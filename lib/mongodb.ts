// lib/mongodb.ts
import mongoose from 'mongoose';

export async function connectToDB() {
  if ((global as any).__MONGO__?.isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    (global as any).__MONGO__ = { isConnected: true };
    console.log('✅ 📦 MongoDB connecté');
  } catch (err) {
    console.error('❌ ⚠️ ❌ MongoDB error', err);
    process.exit(1);
  }
}

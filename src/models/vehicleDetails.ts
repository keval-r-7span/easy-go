import mongoose from 'mongoose';

interface driver {
  _id: mongoose.Schema.Types.ObjectId;
}
interface ImageObject {
  name: string;
  imageUrl: string;
}
interface vehicle {
  model: string; 
  year: number;
  licensePlate: string;
  vehicleClass: 'Bike' | 'Rickshaw' | 'Mini' | 'Premius' | 'XL';
  driverId: driver | string;
  images: ImageObject[];
}

const vehicleDetails = new mongoose.Schema<vehicle>({
  driverId: {
    type: mongoose.Types.ObjectId,
    ref: "Driver",
  },
  model: {
    type: String,
  },
  year: {
    type: Number,
  },
  licensePlate: {
    type: String,
  },
  vehicleClass: {
    type: String,
    enum: ["Bike", "Rickshaw", "mini", "premius", "xl"],
  },
  images: [
    {
      name: { type: String, required: true },
      imageUrl: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    }
  ],
});

export default mongoose.model<vehicle>('Vehicle', vehicleDetails);
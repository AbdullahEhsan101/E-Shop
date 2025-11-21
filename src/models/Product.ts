import mongoose, { Schema, Model } from 'mongoose';

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
    },
    imageUrl: {
        type: String,
        required: [false, 'Please provide an image URL'],
    },
}, { timestamps: true });

const Product: Model<any> = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;

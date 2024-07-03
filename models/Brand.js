const { Schema, models, model, default: mongoose } = require("mongoose");

const BrandSchema = new Schema({
  name: {type: String, required: true},
  parent: {type:mongoose.Types.ObjectId, ref:'Brand'},
})

export const Brand = models?.Brand || model('Brand', BrandSchema);
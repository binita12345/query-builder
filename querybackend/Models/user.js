var userSchema = mongoose.Schema({
    id: { type: String},  // user Id (id of tenant)
    name:{ type: String, default: '' },
    city:{ type: String},
    age:{ type: String},
    email:{ type: String},
});

module.exports = mongoose.model('User', userSchema, 'user');
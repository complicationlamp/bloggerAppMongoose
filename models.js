'use strict';

const mongoose = require('mongoose');

// this is our schema to represent a post
const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: String, required: true},
  created: {type: String, requiered: true}
    // building: String,
    // // coord will be an array of string values
    // coord: [String],
    // street: String,
    // zipcode: String
  // },
  // // grades will be an array of objects
  // grades: [{
  //   date: Date,
  //   grade: String,
  //   score: Number
  // }]
});

// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)
// allow us to define properties on our object that manipulate
// properties that are stored in the database. Here we use it
// to generate a human readable string based on the address object
// we're storing in Mongo.
// postSchema.virtual('addressString').get(function() {
//   return `${this.address.building} ${this.address.street}`.trim()});

// // this virtual grabs the most recent grade for a post.
// postSchema.virtual('grade').get(function() {
//   const gradeObj = this.grades.sort((a, b) => {return b.date - a.date})[0] || {};
//   return gradeObj.grade;
// });

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
postSchema.methods.serialize = function() {

  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.author,
    created: this.created,
    // address: this.addressString
  };
}

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const Post = mongoose.model('Post', postSchema);

module.exports = {Post};

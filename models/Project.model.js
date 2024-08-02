const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
   name: { type: String, required: true, unique: true },
   issues: [{
      issue_title: { type: String, required: true },
      issue_text: { type: String, required: true },
      created_by: { type: String, required: true },
      assigned_to: { type: String },
      created_on: { type: Date, default: Date.now },
      updated_on: { type: Date, default: Date.now },
      status_text: { type: String , default: ''},
      assigned_to : {type: String , default: ''},
      open: { type: Boolean, default: true }

   }]
   });
const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
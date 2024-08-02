'use strict';
const { assert } = require('chai');
const Project = require('../models/Project.model');
module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get( async (req, res)=>{
      const projectName = req.params.project;
      
      const query = req.query;
      const project = await Project.findOne({name: projectName});
      
      if(!project){
        res.json({error: 'Project not found'});
        return;
      }
      let issues = project.issues;
      if(query){

        issues = project.issues.filter(issue => {
          return (query.issue_title ? issue.issue_title === query.issue_title : true) &&
          (query.issue_text ? issue.issue_text === query.issue_text : true) &&
          (query.created_by ? issue.created_by === query.created_by : true) &&
          (query.assigned_to ? issue.assigned_to === query.assigned_to : true) &&
          (query.status_text ? issue.status_text === query.status_text : true) &&
          (query.open ? issue.open.toString() == query.open: true);
        });
      }
      res.json(issues);
    })
    
    .post(async (req, res)=>{
      let project = req.params.project;
      const issue ={
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text
      };
      if(!issue.issue_title || !issue.issue_text || !issue.created_by){
        res.json({error: 'required field(s) missing'});
        return;
      }
      const existedProject = await Project.findOne({name: project});
      if(existedProject){
        existedProject.issues.push(issue);
        existedProject.save();
        res.json(existedProject.issues.slice(-1)[0]);
        return;
      }
      const newProject = new Project({name: project, issues: []});
      newProject.issues.push(issue);
      await newProject.save();
      // res.json();
      res.json(newProject.issues[0]);
    })
    
    .put( async (req, res)=>{
      let project = req.params.project;
      const _id = req.body._id;
      const updates = req.body;
      if(!_id){
        res.json({error: 'missing _id'});
        return;
      }
      const issue = await Project.findById(_id);
      

    })
    
    .delete(async  (req, res)=>{
      let project = req.params.project;
      
    });
    
};

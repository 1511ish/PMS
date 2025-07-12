const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find(); 
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id }); 
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createProject = async (req, res) => {
    try {
        const project = new Project({ ...req.body, user: req.user.id });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ _id: req.params.id });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

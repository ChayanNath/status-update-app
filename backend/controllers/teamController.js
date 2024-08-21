"use strict";

const teamService = require("../services/teamService");

exports.createTeam = async (req, res) => {
  try {
    const { name, members, description } = req.body;
    const team = await teamService.createTeam(name, members, description);
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { teamId, userId } = req.body;
    const team = await teamService.addMember(teamId, userId);
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const result = await teamService.deleteTeam(teamId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, teamMembers } = req.body;
    const result = await teamService.updateTeam(teamId, name, teamMembers);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.grantAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await teamService.grantAdmin(userId);

    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await teamService.getTeams();
    res.json(teams);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.uploadHoliday = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const response = await teamService.uploadHoliday();

    res.status(200).send("Holidays updated successfully.");
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file.");
  }
};

import { Request, Response } from 'express';
import { fetchGithubData, fetchContributionsData, fetchActivityData } from '../services/github.service';

export async function getGithubProfile(req: Request, res: Response) {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const data = await fetchGithubData(username);
    return res.status(200).json(data);
  } catch (error: any) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: "GitHub user not found" });
    }
    if (error.response) {
      // If the error comes from GitHub API (e.g., 401 Bad Credentials, 403 Rate Limit)
      const message = error.response.data?.message || "GitHub API Error";
      console.error(`GitHub API Error for ${username}: ${error.response.status} - ${message}`);
      return res.status(error.response.status).json({ error: message });
    }

    console.error(`Error fetching GitHub data for ${username}:`, error.message);
    return res.status(500).json({ error: "Something went wrong: " + error.message });
  }
}

export async function getGithubContributions(req: Request, res: Response) {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const data = await fetchContributionsData(username);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error(`Error fetching GitHub contributions for ${username}:`, error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export async function getGithubActivity(req: Request, res: Response) {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const data = await fetchActivityData(username);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error(`Error fetching GitHub activity for ${username}:`, error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

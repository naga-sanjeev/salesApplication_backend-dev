import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { Projects, ProjectsHistory } from "./projects.entity";

interface ProjectsInput {
  clientName: string;
  industryType: string;
  practiceName: string;
  submittedBy: string;
  role: string;
  reportsTo: string;
  name: string;
  accountType: string;
  requirement?: string;
  date?: string;
  conversation?: string;
  pointOfContact?: string;
  projectName?: string;
  status?: string;
  technology?: string;
  description?: string;
  architecture?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}
interface ProjectsHistoryInput {
  project_Id: number;
  actions: string;
  submittedBy: string;
  createdAt: string;
}
@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
    @InjectRepository(ProjectsHistory)
    private readonly projectsHistoryRepository: Repository<ProjectsHistory>
  ) {}

  //  Method to fetch all Project details
  findAll(): Promise<Projects[]> {
    return this.projectsRepository.find();
  }

  // Method to create a new Project
  async create(input: ProjectsInput) {
    try {
      const project = this.projectsRepository.create(input);
      const savedProject = await this.projectsRepository.save(project);

      if (savedProject) {
        const projectHistoryData: ProjectsHistoryInput = {
          project_Id: savedProject.projectId,
          actions: JSON.stringify(savedProject),
          submittedBy: savedProject.name,
          createdAt: new Date().toLocaleString(),
        };
        await this.projectsHistoryRepository.save(projectHistoryData);
      }

      return savedProject;
    } catch (error) {
      throw new Error("Error creating project: "+error);
    }
  }

  //  Method to fetch all Project details by user role
  async findByUserRole(role: string): Promise<Projects[]> {
    return this.projectsRepository.find({ where: { role } });
  }

  //  Method to fetch all Project details by username
  async findByUsername(username: string): Promise<Projects[]> {
    return this.projectsRepository.find({ where: { submittedBy: username } });
  }

  //  Method to fetch all Project details by reportsTo
  async findByreportsTo(reportsTo: string): Promise<Projects[]> {
    return this.projectsRepository.find({ where: { reportsTo: reportsTo } });
  }

  //  Method to update a Project details by Project Id
  async edit(
    projectId: number,
    input: ProjectsInput
  ): Promise<Projects | null> {
    try {
      const existingProject = await this.projectsRepository.findOne({
        where: { projectId },
      });

      if (!existingProject) {
        throw new Error("Client not found");
      }
      Object.assign(existingProject, input);
      const upadatedProject =
        await this.projectsRepository.save(existingProject);

      if (upadatedProject) {
        const projectHistoryData: ProjectsHistoryInput = {
          project_Id: upadatedProject.projectId,
          actions: JSON.stringify(upadatedProject),
          submittedBy: upadatedProject.name,
          createdAt: new Date().toLocaleString(),
        };
        await this.projectsHistoryRepository.save(projectHistoryData);
      }

      return upadatedProject;
    } catch (error) {
      throw new Error("Error editing project: "+error);
    }
  }

  //  Method to Delete a Project details by Project Id
  async delete(projectId: number): Promise<boolean> {
    try {
      const existingProject = await this.projectsRepository.findOne({
        where: { projectId },
      });

      const result = await this.projectsRepository.delete(projectId);
      if (result) {
        const projectHistoryData: ProjectsHistoryInput = {
          project_Id: existingProject.projectId,
          actions: JSON.stringify(existingProject),
          submittedBy: existingProject.name,
          createdAt: `DeletedAt: ${new Date().toLocaleString()}`,
        };
        await this.projectsHistoryRepository.save(projectHistoryData);
      }
      return result.affected !== 0; // Return true if any row is affected, false otherwise
    } catch (error) {
      throw new Error("Error deleting project: "+error);
    }
  }

  //  Method to fetch all Project History details by Project Id
  async getProjectsHistoryByProjectId(
    project_Id: number
  ): Promise<ProjectsHistory[]> {
    return await this.projectsHistoryRepository.find({ where: { project_Id } });
  }
}

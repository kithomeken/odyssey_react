import { ProjectDetails } from "../../pages/projects/ProjectDetails";
import { Projects } from "../../pages/projects/Projects";
import { Routes_Interface } from "../routes.Interface";

export const Routes_Project: Array<Routes_Interface> = [
    { path: "/u/default/projects", element: <Projects />, activeMenu: 'Y', caseSensitive: true, name: 'PROJECTS_' }, 
    { path: "/u/default/projects/:uuid", element: <ProjectDetails />, activeMenu: 'Y', caseSensitive: true, name: 'PROJ_DETS_' }, 
]
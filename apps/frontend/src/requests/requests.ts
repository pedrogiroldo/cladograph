import PhylogeneticTreeScriptRequests from "./phylogeneticTreeScript.requests";
import UserRequests from "./user.requests";

export default class Requests {
  public phylogeneticTreeScriptRequests = new PhylogeneticTreeScriptRequests();
  public userRequests = new UserRequests();
}

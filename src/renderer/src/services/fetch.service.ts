export interface IFetchUserService {
  fetchUserHTML(userID: string): Promise<string>;
}

class LocalFetchUserService implements IFetchUserService {
  public async fetchUserHTML(userProfile: string): Promise<string> {
    let userHTML = "";
    try {
      const response = await fetch(userProfile);
      if (!response.ok) throw new Error("Could not fetch user profile");
      userHTML = await response.text();
    } catch (e) {
      console.warn("Error when fetching user profile");
      console.warn(e);
    } finally {
      return userHTML;
    }
  }
}

export default new LocalFetchUserService();

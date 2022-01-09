class UserService {
  async getUser() {
    return [
      {
        a: 1,
      },
    ];
  }

  async createUser(params: any) {
    return {
      a: "As",
    };
  }
}

export default new UserService();

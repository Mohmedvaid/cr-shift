const API = {
  async addTesters(data) {
    const res = await fetch("/api/testers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    return json;
  },

  // async getTesters() {
  //   const res = await fetch("/api/workouts", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: { "Content-Type": "application/json" }
  //   });

  //   const json = await res.json();
  //   return json;
  // },

  async getTesters() {
    const res = await fetch("/api/testers");
    const json = await res.json();

    return json;
  },
};

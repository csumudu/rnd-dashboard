const loadData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve([
        {
          name: "one",
        },
        {
          name: "two",
        },
        {
          name: "three",
        },
      ]);
    // reject(new Error("Down"));
    }, 3000);
  });
};

export default loadData;

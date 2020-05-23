export const SampleData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { val: 100, color: "red", name: "Java" },
        { val: 450, color: "green", name: "C++" },
        { val: 175, color: "orange", name: "JS" },
        { val: 200, color: "gray", name: "Python" },
        { val: 120, color: "pink", name: "Cotlin" },
      ]);
    }, 1000);
  });

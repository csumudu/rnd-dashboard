import React, { useEffect, useState, Suspense } from "react";

const AsyncIconLoader = ({ icon }) => {
  let Comp = icon
    ? React.lazy(() =>
        import(/* webpackMode: "eager" */ `@material-ui/icons/${icon}`)
      )
    : () => null;

  return (
    <Suspense fallback={null}>
      <Comp />
    </Suspense>
  );
};

export default AsyncIconLoader;
